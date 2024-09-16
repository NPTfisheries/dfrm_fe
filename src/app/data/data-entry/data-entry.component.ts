import { Component } from '@angular/core';
import { GridApi, ColDef } from 'ag-grid-community';
import { ActivityService } from 'src/_services/activity.service';
import { ProjectService } from 'src/_services/project.service';

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
export class DataEntryComponent {
  
    data!: any[];
    datasets: any[] = [];
    projects: any[] = [];
    selectedDataset!: number;
    selectedProject!: number;
    selectedInstrument!: number;
    value!: string;
    btnStyle = { 'float': 'right', 'margin-right': '30px' }
    isLoading = false;
    filters: { [key: string]: any } = {};
    invalidForm = false;
  
    private gridApi!: GridApi;
    columnDefs: ColDef[] | undefined;
  
    defaultColDef: ColDef = {
      sortable: true,
      filter: true,
      resizable: true,
      cellStyle: { fontSize: '12px' },
      // cellDataType: false,
    };
  
    constructor(
      private activityService: ActivityService,
      private projectService: ProjectService,
    ) { }
  
    ngOnInit(): void {
      this.activityService.getDatasets().subscribe(datasets => {
        console.log('Datasets:', datasets);
        this.datasets = datasets;
      });

      this.projectService.getProjects().subscribe(projects => {
        this.projects = projects;
      });
  
    }
  
    ngOnDestroy(): void {
    }
  
    onGridReady(params: any) {
      this.gridApi = params.api;
      params.api.sizeColumnsToFit(params);
    }
  
    submit() {
      console.log('Data Entry: SUBMIT.');
    }
  
    selectDataset() {
      if (this.selectedDataset) {
        this.data = [];
        this.columnDefs = [];
        this.isLoading = true;
        this.activityService.getFields(this.selectedDataset).subscribe(fields => {
          console.log(fields);
          this.columnDefs = fields;
          this.isLoading = false;
        });
      }
    }
    
    handleChange(value: number, field: 'dataset' | 'project' | 'instrument') {
      this[field === 'dataset' ? 'selectedDataset' : field === 'project' ? 'selectedProject' : 'selectedInstrument'] = value;
      // this.invalidForm = false;
    }

    addRow(){
      const newRow: Activity = { date: new Date() }; // Customize default values
      this.gridApi.applyTransaction({ add: [newRow] });
    }
    
    removeSelectedRows() {
      const selectedRows = this.gridApi.getSelectedRows();
      this.gridApi.applyTransaction({ remove: selectedRows });
    }
    
    // editRow(rowIndex: number, updatedData: Activity) {
    //   const rowNode = this.gridApi.getDisplayedRowAtIndex(rowIndex);
    //   rowNode.setData(updatedData);
    // }
  
    test() {
      this.activityService.getFields(this.selectedDataset).subscribe(fields => console.log(fields));
    }
  
  
  
}
