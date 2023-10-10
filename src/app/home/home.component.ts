import { Component, OnInit } from '@angular/core';
import { Department } from 'src/_models/department';
import { BackendService } from 'src/_services/backend.service';

import { SelectInputComponent } from '../forms/select-input/select-input.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  token: any | null = null;
  data: Department | undefined;
  bannerImage: string = "./assets/images/Clearwater_River_Home_Page.jpg";

  constructor(
    private backendService: BackendService,
  ) { }

  ngOnInit(): void {
    // we only have 1 department for the time being.
    // this.backendService.get('/api/v1/department/')
    // .subscribe(department => {   
    //   this.data = department[0];

  }

}
