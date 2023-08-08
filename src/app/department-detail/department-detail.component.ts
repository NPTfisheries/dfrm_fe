import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DepartmentService } from 'src/_services/department.service';
import { Department } from 'src/_models/department';

@Component({
  selector: 'app-department-detail',
  templateUrl: './department-detail.component.html',
  styleUrls: ['./department-detail.component.css']
})
export class DepartmentDetailComponent implements OnInit {

  department: Department | null = null;

  constructor(
    private route: ActivatedRoute,
    private departmentService: DepartmentService,
  ) { }


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const slug = params['slug'];
      // fetch data based on slug
      this.departmentService.getDepartment(slug).subscribe(department => {
        console.log('DEP DETAIL:', department);
        this.department = department
      });
    });
  }
}