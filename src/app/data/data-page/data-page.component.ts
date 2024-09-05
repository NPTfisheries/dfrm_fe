import { Component } from '@angular/core';
import { CdmsService } from 'src/_services/cdms.service';
import { GridApi, ColDef } from 'ag-grid-community';

import { buildColumnDefs } from 'src/_utilities/buildColumnDefs';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-data-page',
  templateUrl: './data-page.component.html',
  styleUrls: ['./data-page.component.css']
})
export class DataPageComponent {

  data!: any[];
  datastores: any[] = [];
  selectedDatastore!: number;
  value!: string;
  btnStyle = { 'float': 'right', 'margin-right': '30px' }
  loadedDataset?: string | null;
  isLoading = false;
  filters: { [key: string]: any } = {};

  private gridApi!: GridApi;
  columnDefs: ColDef[] | undefined;

  defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    resizable: true,
    cellStyle: { fontSize: '20px' },
    // cellDataType: false,
  };

  constructor(
    private cdmsService: CdmsService,
  ) { }

  ngOnInit(): void {
    // we need to make sure the login happens before querying anything else from CDMS, which didn't happen 9/4/24
    this.cdmsService.login('api_user', 'api_user').subscribe(response => console.log(response));
    this.cdmsService.getDatastores().subscribe((datastores: any) => this.datastores = datastores);
  }

  ngOnDestroy(): void {
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    params.api.sizeColumnsToFit(params);
  }

  exportData() {
    this.gridApi.exportDataAsCsv(
      { 'fileName': this.buildFilename() }
    );
  }

  retrieveData() {
    if (this.selectedDatastore) {
      this.data = [];
      this.columnDefs = [];
      this.isLoading = true;
      this.loadedDataset = null;
      this.querySelector(this.selectedDatastore);
    }
  }

  getDataFilters(value: any) {
    // console.log(`Active Filters: ${value}`)
    // value.forEach((val:any) => console.log(val));
    this.filters=value;
  }

  handleChange(value: number) {
    // console.log(value, typeof (value));
    this.selectedDatastore = value;
  }

  buildFilename(): string {
    const formattedName = this.loadedDataset?.replace(/\s+/g, '_');
    const currentDate = new Date().toLocaleDateString('en-US', {
      year: '2-digit',
      month: '2-digit',
      day: '2-digit'
    }).replace(/\//g, '');

    return `${formattedName}_${currentDate}.csv`;
  }

  querySelector(datastore_id: number) {
    let dataObservable: Observable<any>;

    switch (datastore_id) {
      case 78:
        dataObservable = this.cdmsService.getReddData(this.filters);
        break;
      case 79:
        dataObservable = this.cdmsService.getCarcassData(this.filters);''
        break;
      case 85:
        dataObservable = this.cdmsService.getJuvAbundance(this.filters);
        break;
      case 86:
        dataObservable = this.cdmsService.getJuvSurvival(this.filters);
        break;
      case 99:
        dataObservable = this.cdmsService.getWeirData(this.filters);
        break;
      case 100:
        dataObservable = this.cdmsService.getFallRR(this.filters);
        break;
      case 102:
        dataObservable = this.cdmsService.getIPTDSesc(this.filters);
        break;
      case 103:
        dataObservable = this.cdmsService.getIPTDSlgr(this.filters);
        break;
      case 104:
        dataObservable = this.cdmsService.getIPTDSrecruits(this.filters);
        break;
      case 107:
        dataObservable = this.cdmsService.getP4data(this.filters);
        break;
      case 110:
        dataObservable = this.cdmsService.getSpawningData(this.filters);
        break;
      case 111:
        dataObservable = this.cdmsService.getReddDataNEOR(this.filters);
        break;
      case 113:
        dataObservable = this.cdmsService.getCarcassDataNEOR(this.filters);
        break;
      case 122:
        dataObservable = this.cdmsService.getWaterTempData(this.filters);
        break;
      default:
        dataObservable = this.cdmsService.getDatastoreView(datastore_id);
    }

    if (dataObservable) {
      dataObservable.subscribe((data: any) => {
        this.processData(data, datastore_id);
      });
    }
  }

  private processData(data: any, datastore_id: number): void {
    // console.log(data);
    this.data = data;
    this.columnDefs = buildColumnDefs(data);
    this.isLoading = false;
    this.loadedDataset = this.datastores.find(ds => ds.Id === datastore_id)?.Name;
  }

}
