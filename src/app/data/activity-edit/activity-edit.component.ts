import { Component } from '@angular/core';
import { GridApi, ColDef } from 'ag-grid-community';
import { ActivityService } from 'src/_services/activity.service';
import { Activity } from 'src/_models/interfaces';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-activity-edit',
  templateUrl: './activity-edit.component.html',
  styleUrls: ['./activity-edit.component.css']
})
export class ActivityEditComponent {
  rowData!: any[];
  activity?: Activity;

  private gridApi!: GridApi;
  columnDefs!: ColDef[];

  defaultColDef: ColDef = { editable: true, cellStyle: { fontSize: '12px' }, wrapHeaderText: true };

  constructor(
    private activityService: ActivityService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      console.log(params);
    });
  }

  ngOnDestroy(): void { }

  onGridReady(params: any) {
    // this.loadActivity();
    this.gridApi = params.api;
    params.api.sizeColumnsToFit();
  }

  click() {
    console.log('click');
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
    console.log(this.columnDefs);
    this.gridApi.sizeColumnsToFit();
  }

  taskName() {
    return typeof this.activity?.task !== 'number' ? this.activity?.task?.name : '';
  }

  loadActivity() {
    this.activityService.getActivity(Number(this.route.snapshot.paramMap.get('id'))).subscribe(activity => {
      this.activity = activity;
      // combine each detail with header
      this.rowData = activity.detail.map((detail:any) => ({...activity.header, ...detail}));

      this.activityService.getFields(activity.task.task_type.id).subscribe(fields => {
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
}
