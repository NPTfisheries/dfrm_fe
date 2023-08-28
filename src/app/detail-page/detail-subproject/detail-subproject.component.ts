import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/_services/auth.service';
import { AlertService } from 'src/_services/alert.service';
import { BackendService } from 'src/_services/backend.service';

import { managerAccess, professionalAccess } from 'src/_utilities/permission-util';

@Component({
  selector: 'app-detail-subproject',
  templateUrl: './detail-subproject.component.html',
  styleUrls: ['./detail-subproject.component.css']
})
export class DetailSubprojectComponent implements OnInit {

  managerAccess = managerAccess;
  professionalAccess = professionalAccess;

  permissionGroup!: string;

  constructor(
    private authService: AuthService, 
    private alertService: AlertService,
    private backendService: BackendService,
  ) {}

  ngOnInit(): void {
    this.permissionGroup = this.authService.getPermissionGroup();
  }
  
  add() { 
    console.log('adding task');
  }

}
