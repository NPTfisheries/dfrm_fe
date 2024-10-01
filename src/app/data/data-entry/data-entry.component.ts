import { Component, OnInit } from '@angular/core';
import { GridApi, ColDef, SelectionOptions, SelectionColumnDef } from 'ag-grid-community';
import { ActivityService } from 'src/_services/activity.service';
import { TaskService } from 'src/_services/task.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Activity } from 'src/_models/interfaces';

@Component({
  selector: 'app-data-entry',
  templateUrl: './data-entry.component.html'
})
export class DataEntryComponent implements OnInit {

  today = new Date().toISOString().slice(0, 10); // max value for date inputs
  activity: Activity = {
    task: undefined,
    // instrument: undefined,
    header: {},
    detail: {}
  };
  tasks!: any[]; // Task[]
  headerFields: any[] | undefined;
  detailData: any[] = [{}]; // This will represent the rows in your AG Grid
  btnStyle = { 'float': 'right', 'margin-right': '30px' }

  activityForm: FormGroup;

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
    private fb: FormBuilder,
    private activityService: ActivityService,
    private taskService: TaskService,
  ) {
    this.activityForm = this.fb.group({
      task: [null], // task should have project, protocol, contract
      // location: null,
      header: fb.group({}),
      date: [null]
    });
  }


  ngOnInit(): void {
    this.taskService.getTasks().subscribe(tasks => this.tasks = tasks); // project doesnt come with Task currently 10/01/24

    // Sync form changes with activity
    this.activityForm.valueChanges.subscribe(value => {
      this.activity = { ...this.activity, ...value };
    });
  }

  onGridReady(params: any) {
    this.gridApi = params.api; // allows access to grid API
    params.api.sizeColumnsToFit();
  }

  addRow() {
    this.gridApi.applyTransaction({ add: [{}] });
  }

  removeSelectedRows() {
    const selectedRows = this.gridApi.getSelectedRows();
    console.log(selectedRows);
    this.gridApi.applyTransaction({ remove: selectedRows });
  }

  taskChange(value: any) {
    console.log('taskChange value:', value);
    if (value === undefined) {
      this.colDefs = undefined;
      this.headerFields = undefined;
      this.activityForm.get('task')?.enable(); // task input returns task_type
    } else {
      // Fetch fields based on selected task type
      this.activityService.getFields(value.task_type.id).subscribe(fields => {
        // Filter header and detail fields
        this.headerFields = fields.filter(field => field.field_for === 'header');
        this.colDefs = fields.filter(field => field.field_for === 'detail');

        // Create form controls for header fields
        const headerGroup = this.activityForm.get('header') as FormGroup;
        this.headerFields.forEach((field: any) => {
          headerGroup.addControl(field.field, this.fb.control(null, field.required ? Validators.required : null));
        });
      });
      
      this.activityForm.get('task')?.disable();
    }
  }

  captureGridData() {
    let rowData: any[] = [];
    this.gridApi.forEachNode((node) => {
      console.log(node);
      rowData.push(node.data); // node.data contains the data for each row
    });
    this.activity.detail = rowData; // Assign the captured data to activity.data [{},{},{}]
  }

  isGridValid(): boolean {
    let isValid = true;
    this.gridApi.forEachNode((node) => {
      this.colDefs?.forEach((col: any) => {
        if (col.required && !node.data[col.field]) {    // if we update this to CONTEXT, change.
          isValid = false; // A required cell is missing data
        }
      });
    });
    console.log('Grid Valid??: ', isValid);
    return isValid;
  }

  submit() {
    console.log('Activity Submitted!');
    if (this.isGridValid()) {
      console.log('Grid data valid')
      this.captureGridData();
      this.activityService.saveActivity(this.activity).subscribe();
      this.activityService.refreshActivities().subscribe();
    } else {
      console.log('Grid invalid')
    }
  }

  resetForm() {
    this.colDefs = undefined;
    this.headerFields = undefined;
    for (let field of ['task', 'project', 'date']) {   // this probably wrong.
      this.activityForm.get(field)?.reset()
    }
    this.activityForm.get('task')?.enable()
    this.detailData = [{}];
  }

  print() {
    // this.captureGridData();
    console.log('Activity:', this.activity);
    // console.log('isGridValid():', this.isGridValid());
    // console.log(this.colDefs);
    // console.log(this.headerFields);
    console.log(this.activityForm.get('header'));
  }

}
