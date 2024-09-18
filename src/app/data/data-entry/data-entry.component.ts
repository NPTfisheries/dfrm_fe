import { Component, OnInit, } from '@angular/core';
import { GridApi, ColDef } from 'ag-grid-community';
import { ActivityService } from 'src/_services/activity.service';
import { ProjectService } from 'src/_services/project.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Activity } from 'src/_models/interfaces';

@Component({
  selector: 'app-data-entry',
  templateUrl: './data-entry.component.html'
})
export class DataEntryComponent implements OnInit {

  today = new Date().toISOString().slice(0, 10); // max value for date input
  activity: Activity = {
    dataset: undefined,
    project: undefined,
    // instrument: undefined,
    date: undefined,
    data: {}
  };
  datasets!: any[];
  projects!: any[];
  rowData: any[] = [{}]; // This will represent the rows in your AG Grid
  btnStyle = { 'float': 'right', 'margin-right': '30px' }

  activityForm: FormGroup;

  private gridApi!: GridApi;
  columnDefs: ColDef[] | undefined;
  defaultColDef: ColDef = {
    cellStyle: { fontSize: '12px' },
    wrapHeaderText: true,
    autoHeaderHeight: true,
  };

  constructor(
    private fb: FormBuilder,
    private activityService: ActivityService,
    private projectService: ProjectService,
  ) {
    this.activityForm = this.fb.group({
      dataset: [null],
      project: [null],
      date: [null]
    });
  }


  ngOnInit(): void {
    this.activityService.getDatasets().subscribe(datasets => this.datasets = datasets);
    this.projectService.getProjects().subscribe(projects => this.projects = projects);

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
    this.gridApi.applyTransaction({ remove: selectedRows });
    this.rowData = this.rowData.filter(row => !selectedRows.includes(row));
  }

  datasetChange(value: any) {
    if (value === undefined) {
      this.columnDefs = undefined;
      this.activityForm.get('dataset')?.enable()
    } else {
      this.activityService.getFields(value.id).subscribe(fields => this.columnDefs = fields);
      this.activityForm.get('dataset')?.disable()
    }
  }

  captureGridData() {
    let rowData: any[] = [];
    this.gridApi.forEachNode((node) => {
      console.log(node);
      rowData.push(node.data); // node.data contains the data for each row
    });
    this.activity.data = rowData; // Assign the captured data to activity.data [{},{},{}]
  }

  isGridValid(): boolean {
    let isValid = true;
    this.gridApi.forEachNode((node) => {
      this.columnDefs?.forEach((col:any) => {
        if (col.required && !node.data[col.field]) {
          isValid = false; // A required cell is missing data
        }
      });
    });
    console.log('Grid Valid??: ', isValid);
    return isValid;
  }

  // updateSubmitButtonState() {
  //   this.isLoading = !(this.activityForm.valid && this.isGridValid());
  // }

  submit() {
    console.log('Activity Submitted!');
    if(this.isGridValid()) {
      console.log('Grid data valid')
      this.captureGridData();
      // this.activityService.saveActivity(this.activity).subscribe();
    } else {
      console.log('Grid invalid')
    }
  }

  resetForm() {
    this.columnDefs = undefined;
    for (let field of ['dataset', 'project', 'date']) {
      this.activityForm.get(field)?.reset()
    }
    this.activityForm.get('dataset')?.enable()
    this.rowData = [{}];
    // this.updateSubmitButtonState(); // Ensure validation re-checks on reset
  }

  printActivity() {
    console.log('Activity:', this.activity);
    console.log('isGridValid():', this.isGridValid());
    this.columnDefs =  [{
      headerName: 'Static Array of Classes',
      field: 'staticArray',
      cellClass: ['grid-required'],
  }]
  }

}
