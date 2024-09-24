import { Component } from '@angular/core';
import { GridApi, ColDef, SelectionColumnDef, SelectionOptions } from 'ag-grid-community';
import { ActivityService } from 'src/_services/activity.service';
import { Activity } from 'src/_models/interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-activities-page',
  templateUrl: './activities-page.component.html'
})
export class ActivitiesPageComponent {

  activities!: any[];
  btnStyle = { 'float': 'right', 'margin-right': '30px' }
  isLoading = false;
  disabled: boolean = true;

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
    private activityService: ActivityService,
    private router: Router,
  ) { }

  // should we add a refresh activities button?

  ngOnInit(): void {
    this.getActivities();
  }

  ngOnDestroy(): void {}

  onGridReady(params: any) {
    this.gridApi = params.api;
    params.api.sizeColumnsToFit(params);
  }

  viewActivity() {
    console.log('viewActivity');
    var selectedActivity = this.gridApi.getSelectedRows()[0]
    this.router.navigate([`activities/${selectedActivity.id}`]); // this may be a cheat, not quite correct.
  }

  getActivities() {
    // 9/24/24 We are receiving the data{} but probably not necessary.
    this.activityService.getActivities().subscribe((activities: Activity[]) => {
      console.log(activities);
      this.activities = activities;
    });
  }

  onSelectionChanged() {
    const selected = this.gridApi.getSelectedRows();
    this.disabled = selected.length === 0;  // if nothing selected, disabled=True
  }

  test() {
    console.log('testing.');
  }

}
