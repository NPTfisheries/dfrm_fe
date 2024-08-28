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

  constructor(
    private cdmsService: CdmsService,
  ) {}

  ngOnInit(): void {
    
  }

  ngOnDestroy(): void {
  }

  login() {
    console.log('CDMS Login!');
    this.cdmsService.login('tylers', '15Platypus!').subscribe(response => {
      console.log(response);
    });
  }

  datastores() {
    console.log('Datastores!');
  }

  
  getDatastore() {
    console.log('getDatastore!');
  }
}
