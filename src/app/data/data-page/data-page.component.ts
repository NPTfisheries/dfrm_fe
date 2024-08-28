import { Component } from '@angular/core';
import { CdmsService } from 'src/_services/cdms.service';
import { GridApi, ColDef } from 'ag-grid-community';

import { buildColumnDefs } from 'src/_utilities/buildColumnDefs';

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
    console.log('getDatastores!');
    this.cdmsService.getDatastores().subscribe((datastores: any) => {
      console.log(datastores);
      this.datastores = datastores;
    });
  }

  getDatastoreView(datastore_id: string) {
    console.log(`getDatastoreView: ${datastore_id}`);
    this.cdmsService.getDatastoreView(datastore_id).subscribe(data => {
      console.log(data);
      this.data = data;
      this.columnDefs = buildColumnDefs(data);
    });
  }

  retrieveData() {
    if (this.selectedDatastore) {
      this.getDatastoreView(this.selectedDatastore)
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

}
