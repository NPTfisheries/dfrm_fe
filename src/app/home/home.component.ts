import { Component, OnInit } from '@angular/core';
import { Department } from 'src/_models/department';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  token: any | null = null;
  data: Department | undefined;
  bannerImage: string = "./assets/images/Clearwater_River_Home_Page.jpg";

  constructor() {}

  ngOnInit(): void {
  }

}
