import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DepartmentService } from 'src/_services/department.service';
import { DivisionService } from 'src/_services/division.service';
import { ProjectService } from 'src/_services/project.service';
import { getRouteType } from 'src/_utilities/route-utils';

@Component({
  selector: 'app-card-page',
  templateUrl: './card-page.component.html'
})
export class CardPageComponent implements OnInit {

  department: any | undefined;
  list: any | undefined;
  routeType!: string | undefined;
  bannerImage: any | undefined = "./assets/images/Clearwater_River_Home_Page.jpg";

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private departmentService: DepartmentService,
    private divisionService: DivisionService,
  ) { }

  ngOnInit(): void {
    this.getList();
  }

  getList() {
    this.routeType = getRouteType(this.route);

    switch (this.routeType) {
      case 'divisions':
        this.divisionService.getDivisions().subscribe(divisions => {
          var display_divisions: any = [];
          divisions.filter(division => {
            if (division.display) { display_divisions.push(division) }
          });
          this.list = display_divisions;
        });
        this.departmentService.getDepartments().subscribe(departments => {
          this.department = departments[0];
        });
        break;
      case 'projects':
        this.projectService.getProjects().subscribe(projects => {
          var display_projects: any = [];
          projects.filter(project => {
            if (project.display) { display_projects.push(project) }
          });
          this.list = display_projects;
        });
        break;
    }
  }

}
