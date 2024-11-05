import { Component } from '@angular/core';
import { GridApi, ColDef, SelectionOptions, SelectionColumnDef } from 'ag-grid-community';
import { ActivityService } from 'src/_services/activity.service';
import { Activity } from 'src/_models/interfaces';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-activity-edit',
  templateUrl: './activity-edit.component.html',
  styleUrls: ['./activity-edit.component.css']
})
export class ActivityEditComponent {
  today = new Date().toISOString().slice(0, 10); // max value for date inputs
  rowData!: any[];
  activity_id!: number;
  activity?: Activity;
  locations!: any[];
  instruments!: any[];
  headerFields: any[] | undefined;
  detailData: any[] = [{}];
  activityEditForm: FormGroup;
  
  private gridApi!: GridApi;
  columnDefs!: ColDef[];
  defaultColDef: ColDef = { editable: true, cellStyle: { fontSize: '12px' }, wrapHeaderText: true };
  public selection: SelectionOptions = {
    mode: 'multiRow',
    // selectAll: true, enableClickSelection: 'enableSelection',checkboxes: true, hideDisabledCheckboxes: true, 
    headerCheckbox: true,
    copySelectedRows: true
  }

  constructor(
    private fb: FormBuilder,
    private activityService: ActivityService,
    private route: ActivatedRoute
  ) { 
    this.activityEditForm = this.fb.group({
      task: [null], 
      location: [null],
      instrument: [null],
      header: fb.group({}),
    });
  }

  ngOnInit(): void {
    // this.activity_id = this.route.params
    console.log(this.route)
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
