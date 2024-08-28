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
  selectedDatastore!: string;
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

  testQuery() {
    console.log('Test Query!');
    var start = performance.now();
    this.cdmsService.getCarcassData().subscribe(data => {
      // this.cdmsService.getDatastoreView('86').subscribe(data => {
      console.log(data);
      var finish = performance.now();
      console.log(`Took ${(finish - start) / 1000 / 60} minutes.`)
    });
  }

  login() {
    console.log('CDMS Login!');
    // check for isLoggedIn??
    this.cdmsService.login('api_user', 'api_user').subscribe(response => {
      console.log(response);
    });
  }

  getDatastores() {
    console.log('getDatastores!');
    this.cdmsService.getDatastores().subscribe((datastores: any) => {
      console.log(datastores);
      this.datastores = datastores;
    });
  }

  getDatastoreView(datastore_id: string) {
    console.log(`getDatastoreView: ${datastore_id}`);
    this.cdmsService.getDatastoreView(datastore_id).subscribe(data => {
      this.processData(data, datastore_id);
    });
  }

  retrieveData() {
    if (this.selectedDatastore) {
      this.isLoading = true;
      this.loadedDataset = null;
      // this.getDatastoreView(this.selectedDatastore)
      this.querySelector(this.selectedDatastore);
    }
  }

  handleChange(value: string) {
    console.log(value);
    this.selectedDatastore = value;
  }

  buildFilename(): string {
    const datastoreName = this.datastores.find(ds => ds.Id === this.selectedDatastore)?.Name || 'export';
    const formattedName = datastoreName.replace(/\s+/g, '_');
    const currentDate = new Date().toLocaleDateString('en-US', {
      year: '2-digit',
      month: '2-digit',
      day: '2-digit'
    }).replace(/\//g, '');

    return `${formattedName}_${currentDate}.csv`;
  }

  querySelector(datastore_id: string) {
    let dataObservable: Observable<any>;

    switch (datastore_id) {
      case '78':
        dataObservable = this.cdmsService.getCarcassData();
        break;
      case '79':
        dataObservable = this.cdmsService.getReddData();
        break;
      case '85':
        dataObservable = this.cdmsService.getJuvAbundance();
        break;
      case '86':
        dataObservable = this.cdmsService.getJuvSurvival();
        break;
      case '99':
        dataObservable = this.cdmsService.getWeirData();
        break;
      case '100':
        dataObservable = this.cdmsService.getFallRR();
        break;
      case '107':
        dataObservable = this.cdmsService.getP4data();
        break;
      case '110':
        dataObservable = this.cdmsService.getSpawningData();
        break;
      case '111':
        dataObservable = this.cdmsService.getReddDataNEOR();
        break;
      case '113':
        dataObservable = this.cdmsService.getCarcassDataNEOR();
        break;
      case '122':
        dataObservable = this.cdmsService.getWaterTempData();
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

  private processData(data: any, datastore_id: string): void {
    console.log(data);
    this.data = data;
    this.columnDefs = buildColumnDefs(data);
    this.isLoading = false;
    this.loadedDataset = this.datastores.find(ds => ds.Id === datastore_id)?.Name;
  }

}
