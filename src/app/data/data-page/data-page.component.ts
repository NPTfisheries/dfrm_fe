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
  bannerImage: any | undefined = "./assets/images/Clearwater_River_Home_Page.jpg";
  datastores: any[] = [];
  selectedDatastore!: number;
  value!: string;
  btnStyle = { 'float': 'right', 'margin-right': '30px' }
  loadedDataset?: string | null;
  isLoading = false;

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
    this.login();
    this.getDatastores();
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

  login() {
    console.log('CDMS Login!');
    // check for isLoggedIn??
    this.cdmsService.login('api_user', 'api_user').subscribe(response => {
      console.log(response);
    });
  }

  getDatastores() {
    this.cdmsService.getDatastores().subscribe((datastores: any) => {
      this.datastores = datastores;
    });
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
        dataObservable = this.cdmsService.getReddData();
        break;
      case 79:
        dataObservable = this.cdmsService.getCarcassData();
        break;
      case 85:
        dataObservable = this.cdmsService.getJuvAbundance();
        break;
      case 86:
        dataObservable = this.cdmsService.getJuvSurvival();
        break;
      case 99:
        dataObservable = this.cdmsService.getWeirData();
        break;
      case 100:
        dataObservable = this.cdmsService.getFallRR();
        break;
      case 107:
        dataObservable = this.cdmsService.getP4data();
        break;
      case 110:
        dataObservable = this.cdmsService.getSpawningData();
        break;
      case 111:
        dataObservable = this.cdmsService.getReddDataNEOR();
        break;
      case 113:
        dataObservable = this.cdmsService.getCarcassDataNEOR();
        break;
      case 122:
        dataObservable = this.cdmsService.getWaterTempData(2024);
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

  getOptions() {
    this.cdmsService.options('npt/getsgscarcassdata').subscribe(response => {
      console.log(`Options response ${response}`);
    });
  }

}
