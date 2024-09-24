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
  detail_fields!: string[];
  btnStyle = { 'float': 'right', 'margin-right': '30px' }

  private gridApi!: GridApi;
  columnDefs!: ColDef[];

  defaultColDef: ColDef = { editable: false, filter: false, cellStyle: { fontSize: '12px' } };

  constructor(
    private route: ActivatedRoute,
    private activityService: ActivityService,
  ) { }

  ngOnInit(): void {
    console.log(this.route.snapshot);
    this.activityService.getActivity(Number(this.route.snapshot.paramMap.get('id'))).subscribe(activity => {
      console.log(activity);
      this.activity = activity;
      this.dataset_name = activity.dataset.name;
      this.project_name = activity.project.name;

      const uniqueKeys = new Set<string>(); // for finding non-protocol fields

      this.data = activity.data.map((row: any) => {

        Object.keys(row).forEach(key => uniqueKeys.add(key));

        return {
          ...row,
          dataset: this.dataset_name,
          project: this.project_name,
          date: activity.date
        };
      });

      this.detail_fields = Array.from(uniqueKeys); // array used to discover Odd Columns (non-Protocol)

      this.activityService.getFields(activity.dataset.id).subscribe(fields => {
        // only include what is necessary for viewing (no validation, editors, etc.)
        this.columnDefs = fields.map((field: any) => {
          // filter out to discover which colDefs we will build on the fly.
          if(this.detail_fields.includes(field.field)) {
           this.detail_fields = this.detail_fields.filter(str => str !== field.field); 
          }

          return {
            field: field.field,
            headerName: field.headerName,
            minWidth: field.minWidth,
            maxWidth: field.maxWidth
          };
        });

        this.columnDefs.unshift({ field: 'date', hide: true }, { field: 'dataset', hide: true }, { field: 'project', hide: true });
        // add in the non-protocol colDefs
        this.detail_fields.forEach(field => this.columnDefs.push({field: field, minWidth: 100}));
      });
    });
  }

  ngOnDestroy(): void { }

  onGridReady(params: any) {
    this.gridApi = params.api;
    params.api.sizeColumnsToFit();
  }

  buildFilename(): string {
    const currentDate = new Date().toLocaleDateString('en-US', {
      year: '2-digit',
      month: '2-digit',
      day: '2-digit'
    }).replace(/\//g, '');

    return `activity_${this.activity?.id}_${currentDate}.csv`;
  }

  saveAsCSV() {
    console.log('saveAsCSV');
    console.log(this.buildFilename());
    this.gridApi.exportDataAsCsv(
      { 'fileName': this.buildFilename(), 'allColumns': true }
    );
  }

  budn() {
    this.gridApi.sizeColumnsToFit();
  }

}
