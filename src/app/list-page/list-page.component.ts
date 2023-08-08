import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { DepartmentUpdateComponent } from '../department-update/department-update.component';
import { DepartmentService } from 'src/_services/department.service';
import { Department } from 'src/_models/department';


@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.css']
})
export class ListPageComponent implements OnInit {

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

}
