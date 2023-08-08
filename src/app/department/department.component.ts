import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { DepartmentUpdateComponent } from '../department-update/department-update.component';
import { DepartmentService } from 'src/_services/department.service';
import { Department } from 'src/_models/department';


@Component({
  selector: 'app-list-page',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {

  title = 'Department'

  departmentList:any;

  constructor (
    private modalService: NgbModal,
    private departmentService: DepartmentService,
  ) {}

  ngOnInit(): void {
    this.departmentService.getDepartmentList().subscribe(list =>
      this.departmentList = list)
  };

  addDepartment() {
    this.modalService.open(DepartmentUpdateComponent, { size: 'xl'});
  }

  clicky() {
    console.log('clicky');
  }

}
