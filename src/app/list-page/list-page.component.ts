import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';

import { AgGridAngular } from 'ag-grid-angular';
import { GridApi, ColDef } from 'ag-grid-community';
import { getColumnDefs } from 'src/_services/columnDef.service';

import { AuthService } from 'src/_services/auth.service';
import { RegisterComponent } from '../forms/register/register.component';
import { ImageUploadComponent } from '../forms/image-upload/image-upload.component';
import { Subscription } from 'rxjs';

import { FormContainerComponent } from '../forms/form-container/form-container.component';

import { getRouteType } from 'src/_utilities/route-utils';
import { adminAccess, managerAccess, projectleaderAccess } from 'src/_utilities/permission-util';
import { UserService } from 'src/_services/user.service';
import { ProjectService } from 'src/_services/project.service';
import { DivisionService } from 'src/_services/division.service';
import { DepartmentService } from 'src/_services/department.service';
import { FacilityService } from 'src/_services/facility.service';
import { ImageService } from 'src/_services/image.service';
import { TaskService } from 'src/_services/task.service';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.css']
})
export class ListPageComponent implements OnInit, OnDestroy {

  @ViewChild(FormContainerComponent) formContainerComponent!: FormContainerComponent;
  @ViewChild(RegisterComponent) registerComponent!: RegisterComponent;
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;


  private gridApi!: GridApi;
  columnDefs: ColDef[] | undefined;

  // default settings for all columns.
  defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    resizable: true,
    cellStyle: { fontSize: '20px' },
    // cellDataType: false,
  };

  data!: any[];

  adminAccess = adminAccess;
  managerAccess = managerAccess;
  projectleaderAccess = projectleaderAccess;
  routeType!: string;
  permissionGroup!: string;
  private permissionGroupSubscription: Subscription;
  btnStyle = { 'float': 'right', 'margin-right': '30px' }

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private modalService: NgbModal,
    private userService: UserService,
    private projectService: ProjectService,
    private taskService: TaskService,
    private divisionService: DivisionService,
    private departmentService: DepartmentService,
    private facilityService: FacilityService,
    private imageService: ImageService
  ) {
    this.permissionGroupSubscription = this.authService.permissionGroup$.subscribe(group => {
      this.permissionGroup = group;
    });
  }

  ngOnInit(): void {
    this.routeType = getRouteType(this.route);
    this.columnDefs = getColumnDefs(this.routeType, this);
  }

  ngOnDestroy(): void {
    this.permissionGroupSubscription.unsubscribe();
  }

  onGridReady(params: any) {
    this.getList()

    this.gridApi = params.api;
    params.api.sizeColumnsToFit(params);
    // params.api.autoSizeAllColumns();
  }

  getList() {
    switch (this.routeType) {
      case 'department':
        this.departmentService.getDepartments().subscribe((departments) => {
          this.data = departments;
        });
        break;
      case 'facility':
        this.facilityService.getFacilities().subscribe((facilities) => {
          this.data = facilities;
        });
        break;
      case 'division':
        this.divisionService.getDivisions().subscribe((divisions) => {
          this.data = divisions;
        });
        break;
      case 'project':
        this.projectService.getProjects().subscribe((projects) => {
          this.data = projects;
        });
        break;
      case 'task':
        this.taskService.getTasks().subscribe((tasks) => {
          this.data = tasks;
        });
        break;
      case 'users':
        this.userService.getUsers().subscribe((users) => {
          this.data = users;
        });
        break;
      case 'image':
        this.imageService.getImages().subscribe((images) => {
          this.data = images;
        });
        break;
      default:
        console.log('Did not capture routeType.');
        break;
    }
  }

  // add department, division, and project
  add(routeType: string | undefined) {
    // console.log('add:', routeType);
    const modalRef = this.modalService.open(FormContainerComponent, this.getModalOptions());
    modalRef.componentInstance.context = this;
    modalRef.componentInstance.routeType = routeType;
    modalRef.componentInstance.addOrEdit = 'add'

    modalRef.result.then(() => {
      this.authService.refreshPermissions().subscribe();
      this.refreshList();
    });
  }

  uploadImage() {
    const modalRef = this.modalService.open(ImageUploadComponent, this.getModalOptions());
    modalRef.componentInstance.context = this;

    modalRef.result.then(() => {
      this.authService.refreshPermissions().subscribe();
      this.refreshList();
    });
  }

  registerUser() {
    const modalRef = this.modalService.open(RegisterComponent, this.getModalOptions());
    modalRef.componentInstance.context = this;

    modalRef.result.then(() => {
      this.authService.refreshPermissions().subscribe();
      this.refreshList();
    });
  }

  getModalOptions(): NgbModalOptions {
    return { size: 'xl', };
  }

  refreshList() {
    switch (this.routeType) {
      case 'department':
        this.departmentService.refreshDepartments().subscribe((departments) => {
          this.data = departments;
        });
        break;
      case 'facility':
        this.facilityService.refreshFacilities().subscribe((facilities) => {
          this.data = facilities;
        });
        break;
      case 'division':
        this.divisionService.refreshDivisions().subscribe((divisions) => {
          this.data = divisions;
        });
        break;
      case 'project':
        this.projectService.refreshProjects().subscribe((projects) => {
          this.data = projects;
        });
        break;
      case 'task':
        this.taskService.refreshTasks().subscribe((tasks) => {
          this.data = tasks;
        });
        break;
      case 'users':
        this.userService.refreshUsers().subscribe((users) => {
          this.data = users;
        });
        break;
      case 'image':
        this.imageService.refreshImages().subscribe((images) => {
          this.data = images;
        });
        break;
      default:
        console.log('Did not capture routeType.');
        break;
    }
  }

}
