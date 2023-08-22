import { Component, OnInit } from '@angular/core';
import { Department } from 'src/_models/department';

import { BackendService } from 'src/_services/backend.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  token: any | null = null;
  info: Department | undefined;

  constructor(
    private backendService: BackendService,
  ) {  }

  ngOnInit(): void {
    this.backendService.get('/api/v1/department/fisheries/').subscribe(department => {
      this.info = department;
    });
  }
}
