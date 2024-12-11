import { Component } from '@angular/core';
import { GridApi, ColDef, SelectionColumnDef, SelectionOptions } from 'ag-grid-community';
import { ActivityService } from 'src/_services/activity.service';
import { Activity } from 'src/_models/interfaces';
import { Router } from '@angular/router';
import { LinkButtonRendererComponent } from 'src/_renderers/link-button-renderer/link-button-renderer.component';
import { ActivityEditRendererComponent } from 'src/_renderers/activity-edit-renderer/activity-edit-renderer.component';

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
    {headerName: 'Id', field: 'id', minWidth: 75, maxWidth: 75, resizable: false },
    {headerName: 'Task Type', field: 'task.task_type.name' },
    {headerName: 'Project', field: 'task.project.name' },
    {headerName: 'Last Updated', field: 'updated_at', minWidth: 150, maxWidth: 150, resizable: false },
    {headerName: 'Data', field: 'data', hide: true },
    {headerName: 'View', field: 'activity_id', cellRenderer: LinkButtonRendererComponent, cellRendererParams: {} },
    // edit needs the activity_id for routing, and task to check perms & render button.
    {headerName: 'Edit', field: 'activity_id', cellRenderer: ActivityEditRendererComponent, cellRendererParams: {}}
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
    params.api.sizeColumnsToFit();
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

  consoleLog() {
    console.log('testing.');
  }

}
