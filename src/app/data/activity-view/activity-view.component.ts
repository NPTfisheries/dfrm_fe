import { Component } from '@angular/core';
import { GridApi, ColDef, SelectionColumnDef, SelectionOptions } from 'ag-grid-community';
import { ActivityService } from 'src/_services/activity.service';
import { ActivatedRoute } from '@angular/router';
import { Activity } from 'src/_models/interfaces';

@Component({
  selector: 'app-activity-view',
  templateUrl: './activity-view.component.html'
})
export class ActivityViewComponent {

  data!: any[];
  activity?: Activity;
  dataset_name!: string;
  project_name!: string;
  btnStyle = { 'float': 'right', 'margin-right': '30px' }

  private gridApi!: GridApi;
  columnDefs!: ColDef[];

  defaultColDef: ColDef = { editable: false, filter: false, cellStyle: { fontSize: '12px' } };

  public selection: SelectionOptions = { mode: 'singleRow' }
  public selectionColumnDef: SelectionColumnDef = { pinned: 'left' }

  constructor(
    private route: ActivatedRoute,
    private activityService: ActivityService,
  ) { }

  ngOnInit(): void {
    console.log(this.route.snapshot);
    this.activityService.getActivity(Number(this.route.snapshot.paramMap.get('id'))).subscribe(activity => {
      console.log(activity);
      this.activity = activity;
      this.data = activity.data;
      this.dataset_name = activity.dataset.name;
      this.project_name = activity.project.name;

      this.activityService.getFields(activity.dataset.id).subscribe(fields => {
        // only include what is necessary for viewing (no validation, editors, etc.)
        this.columnDefs = fields.map((field:any) => ({
          field: field.field,
          headerName: field.headerName,
          minWidth: field.minWidth,
          maxWidth: field.maxWidth
        }));

        if(this.gridApi) {
          this.gridApi.sizeColumnsToFit();
        }
      });
    });
  }

  ngOnDestroy(): void { }

  onGridReady(params: any) {
    this.gridApi = params.api;
    params.api.sizeColumnsToFit();
  }

  buildFilename(): string {
    const currentDate = new Date().toLocaleDateString('en-US', {
      year: '2-digit',
      month: '2-digit',
      day: '2-digit'
    }).replace(/\//g, '');

    return `activity_${this.activity?.id}_${currentDate}.csv`;
  }

  saveAsCSV() {
    console.log('saveAsCSV');
    console.log(this.buildFilename());
  }

  budn() {
    this.gridApi.sizeColumnsToFit();
  }
}
