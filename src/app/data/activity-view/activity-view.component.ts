import { Component } from '@angular/core';
import { GridApi, ColDef } from 'ag-grid-community';
import { ActivityService } from 'src/_services/activity.service';
import { ActivatedRoute } from '@angular/router';
import { Activity } from 'src/_models/interfaces';

@Component({
  selector: 'app-activity-view',
  templateUrl: './activity-view.component.html'
})
export class ActivityViewComponent {

  rowData!: any[];
  activity?: Activity;
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
  }

  ngOnDestroy(): void { }

  onGridReady(params: any) {
    this.loadActivity();
    this.gridApi = params.api;
    params.api.sizeColumnsToFit();
  }

  loadActivity() {
    this.activityService.getActivity(Number(this.route.snapshot.paramMap.get('id'))).subscribe(activity => {
      this.activity = activity;
      console.log('Activity Loaded:', activity);

      // combine each detail with header
      this.rowData = activity.detail.map((detail: any) => ({ ...activity.header, ...detail }));

      this.activityService.getFields(activity.task.task_type).subscribe(fields => {
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

  // CSV EXPORT
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

  // used in HTML
  taskName() {return typeof this.activity?.task !== 'number' ? this.activity?.task?.name : ''; }

  // testing
  budn() {
    console.log(this.columnDefs);
    this.gridApi.sizeColumnsToFit();
  }
}
