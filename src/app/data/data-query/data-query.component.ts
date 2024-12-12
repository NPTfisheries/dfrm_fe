import { Component, OnInit } from '@angular/core';
import { GridApi, ColDef, SelectionOptions, SelectionColumnDef } from 'ag-grid-community';
import { ActivityService } from 'src/_services/activity.service';
import { TaskService } from 'src/_services/task.service';
import { LookUpService } from 'src/_services/lookup.service';
import { Activity } from 'src/_models/interfaces';

@Component({
  selector: 'app-data-query',
  templateUrl: './data-query.component.html',
  styleUrls: ['./data-query.component.css']
})
export class DataQueryComponent implements OnInit {

  task_types!: any[];
  selectedTaskType = undefined;
  disableTaskType: boolean = false;

  data: any[] = [{}]; // This will represent the rows in AG Grid

  private gridApi!: GridApi;
  colDefs: ColDef[] | undefined;
  defaultColDef: ColDef = {
    cellStyle: { fontSize: '12px' },
    wrapHeaderText: true,
    autoHeaderHeight: true,
  };
  public selection: SelectionOptions = {
    mode: 'multiRow',
    // selectAll: true, enableClickSelection: 'enableSelection',checkboxes: true, hideDisabledCheckboxes: true, 
    headerCheckbox: true,
    copySelectedRows: true
  }
  public selectionColumnDef: SelectionColumnDef = {
    sortable: false,
    suppressHeaderMenuButton: false,
    pinned: 'left',
  }

  constructor(
    private lookUpService: LookUpService,
    private activityService: ActivityService,
  ) { }

  ngOnInit(): void {
    this.lookUpService.getLookUpsByObjectType('Task').subscribe(task_types => this.task_types = task_types);
  }

  onGridReady(params: any) {
    this.gridApi = params.api; // allows access to grid API
    params.api.sizeColumnsToFit();
  }

  taskTypeChange(value: any) { // value = task_type{}
    console.log('taskTypeChange value:', value);
    if (value != undefined) {
      // Fetch fields based on selected task (i.e., task type)
      this.activityService.getFields(value.id).subscribe(fields => {
        console.log(fields);
        this.colDefs = fields;
      });

      this.activityService.getActivities().subscribe(activities => {
        this.data = activities;
      });

      this.disableTaskType = true;
    }
  }

  resetTaskType() {
    this.selectedTaskType = undefined;
    this.disableTaskType = false;
    this.colDefs = undefined;
    this.data = [{}];
  }

  printCSV() {
    console.log('Print CSV')
  }

  consoleLog() {
    console.log('Column Definitions:', this.colDefs);
    console.log('Data:', this.data);
  }

}

