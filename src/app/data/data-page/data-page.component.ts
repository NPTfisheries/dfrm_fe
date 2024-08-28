import { Component } from '@angular/core';
import { CdmsService } from 'src/_services/cdms.service';

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


  constructor(
    private cdmsService: CdmsService,
  ) { }

  ngOnInit(): void {
    this.login();
    this.getDatastores();
  }

  ngOnDestroy(): void {
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

}
