import { Component, OnInit, } from '@angular/core';
import { GridApi, ColDef } from 'ag-grid-community';
import { ActivityService } from 'src/_services/activity.service';
import { ProjectService } from 'src/_services/project.service';
import { FormGroup, FormBuilder, Form } from '@angular/forms';

interface Activity {
  user?: number;
  // location?: number;
  project?: number;
  dataset?: number;
  instrument?: number;
  date?: Date;
  data?: {};
}

@Component({
  selector: 'app-data-entry',
  templateUrl: './data-entry.component.html',
  styleUrls: ['./data-entry.component.css']
})
export class DataEntryComponent implements OnInit {

  today = new Date().toISOString().slice(0, 10);
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
  selectedDataset!: number;
  btnStyle = { 'float': 'right', 'margin-right': '30px' }
  isLoading = false;

  activityForm: FormGroup;

  private gridApi!: GridApi;
  columnDefs: ColDef[] | undefined;
  defaultColDef: ColDef = { cellStyle: { fontSize: '12px' } };

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

  ngOnDestroy(): void {
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    params.api.sizeColumnsToFit();
  }

  updateValues(value: any, key: keyof Activity) {
    if (key === 'dataset') {
      this.activityService.getFields(value.id).subscribe(fields => this.columnDefs = fields);
      this.selectedDataset = value.name;
    }
    this.activity[key] = value.id; // General case for project and dataset
  }

  addRow() {
    const newRow: Activity = { date: new Date() }; // Customize default values
    this.gridApi.applyTransaction({ add: [newRow] });
    this.rowData.push(newRow);
    this.activity.data = this.rowData;
  }

  removeSelectedRows() {
    const selectedRows = this.gridApi.getSelectedRows();
    this.gridApi.applyTransaction({ remove: selectedRows });
    this.rowData = this.rowData.filter(row => !selectedRows.includes(row));
    this.activity.data = this.rowData;
  }

  // editRow(rowIndex: number, updatedData: Activity) {
  //   const rowNode = this.gridApi.getDisplayedRowAtIndex(rowIndex);
  //   rowNode.setData(updatedData);
  // }

  printData() {
    console.log('Activity:', this.activity);
  }

  submit() {
    console.log('Data Entry: SUBMIT.');
  }

}
