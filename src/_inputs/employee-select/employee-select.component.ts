import { Component, OnInit } from '@angular/core';

import { BackendService } from 'src/_services/backend.service';
// import { User } from 'src/_models/user';

@Component({
  selector: 'app-employee-select',
  templateUrl: './employee-select.component.html',
  styleUrls: ['./employee-select.component.css']
})
export class EmployeeSelectComponent implements OnInit {

  selected = '';
  userList: object | undefined;

  constructor(
    private backendService: BackendService,
  ) { }


  ngOnInit(): void {
    this.backendService.get('api/v1/user').subscribe(userList =>
      this.userList = userList
      );
  }
}
