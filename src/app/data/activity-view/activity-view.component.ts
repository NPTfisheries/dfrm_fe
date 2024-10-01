import { Component } from '@angular/core';
import { GridApi, ColDef, SelectionColumnDef, SelectionOptions } from 'ag-grid-community';
import { ActivityService } from 'src/_services/activity.service';
import { ActivatedRoute } from '@angular/router';
import { Activity } from 'src/_models/interfaces';

@Component({
  selector: 'app-activity-view',
  templateUrl: './activity-view.component.html'
})
export class ActivityViewComponent {

  data!: any[];
  activity?: Activity;
  dataset_name!: string;
  project_name!: string;
  btnStyle = { 'float': 'right', 'margin-right': '30px' }

  private gridApi!: GridApi;
  columnDefs!: ColDef[];

  // defaultColDef: ColDef = { editable: false, filter: false, cellStyle: { fontSize: '12px' }, wrapHeaderText: true };
  defaultColDef: ColDef = { editable: false, cellStyle: { fontSize: '12px' }, wrapHeaderText: true };

  constructor(
    private route: ActivatedRoute,
    private activityService: ActivityService,
  ) { }

  ngOnInit(): void {
    console.log(this.route.snapshot);
    this.activityService.getActivity(Number(this.route.snapshot.paramMap.get('id'))).subscribe(activity => {
      console.log(activity);
      this.activity = activity;
      // this.dataset_name = activity.dataset.name;
      // this.project_name = activity.project.name;
      this.data = activity.data;
      
      this.activityService.getFields(activity.dataset.id).subscribe(fields => {
        // only include what is necessary for viewing (no validation, editors, etc.)
        this.columnDefs = fields.map((field: any) => {
          return {
            field: field.field,
            context: { required: field.required },  // capture non-colDefs
            headerName: field.headerName,
            filter: field.filter,
            minWidth: field.minWidth,
            maxWidth: field.maxWidth,
            cellClass: field.cellClass ? field.cellClass.filter((c: string) => c !== 'grid-required') : []
          };
        });
      });
    });
  }

  ngOnDestroy(): void { }

  onGridReady(params: any) {
    this.gridApi = params.api;
    params.api.sizeColumnsToFit();
  }

  saveAsCSV() {
    console.log('saveAsCSV');
    console.log(this.buildFilename());
    this.gridApi.exportDataAsCsv(
      { 'fileName': this.buildFilename(), 'allColumns': true }
    );
  }
  
  private buildFilename(): string {
    const currentDate = new Date().toLocaleDateString('en-US', {
      year: '2-digit',
      month: '2-digit',
      day: '2-digit'
    }).replace(/\//g, '');

    return `activity_${this.activity?.id}_${currentDate}.csv`;
  }

  budn() {
    this.gridApi.sizeColumnsToFit();
  }

}
