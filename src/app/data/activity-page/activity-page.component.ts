import { Component } from '@angular/core';
import { GridApi, ColDef, SelectionColumnDef, SelectionOptions } from 'ag-grid-community';
import { ActivityService } from 'src/_services/activity.service';
import { Activity } from 'src/_models/interfaces';

@Component({
  selector: 'app-activity-page',
  templateUrl: './activity-page.component.html'
})
export class ActivityPageComponent {

  activities!: any[];
  btnStyle = { 'float': 'right', 'margin-right': '30px' }
  isLoading = false;
  invalidForm = false;

  private gridApi!: GridApi;
  columnDefs: ColDef[] = [
    {headerName: 'Activity Id', field: 'id', minWidth: 175, maxWidth: 175, resizable: false },
    {headerName: 'Dataset', field: 'dataset.name' },
    {headerName: 'Project', field: 'project.name' },
    {headerName: 'Date', field: 'date', minWidth: 115, maxWidth: 115, resizable: false },
    {headerName: 'Data', field: 'data', hide: true },
  ];

  defaultColDef: ColDef = { filter: true, sortable: true, editable: false, cellStyle: { fontSize: '12px' } };

  public selection: SelectionOptions = { mode: 'singleRow' }
  public selectionColumnDef: SelectionColumnDef = { pinned: 'left' }

  constructor(
    private activityService: ActivityService
  ) { }

  ngOnInit(): void {
    this.getActivities();
  }

  ngOnDestroy(): void {}

  onGridReady(params: any) {
    this.gridApi = params.api;
    params.api.sizeColumnsToFit(params);
  }

  loadActivity() {
    console.log('loading activity');
    console.log(this.gridApi.getSelectedRows());
  }

  getActivities() {
    this.activityService.getActivities().subscribe((activities: Activity[]) => {
      console.log(activities);
      this.activities = activities;
    });
  }

  test() {
    console.log('testing.');
  }

}
