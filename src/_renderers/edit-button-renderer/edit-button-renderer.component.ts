import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormContainerComponent } from 'src/app/forms/form-container/form-container.component';

import { projectleaderAccess } from 'src/_utilities/permission-util';
import { AuthService } from 'src/_services/auth.service';
import { ProjectService } from 'src/_services/project.service';
import { DepartmentService } from 'src/_services/department.service';
import { DivisionService } from 'src/_services/division.service';
import { UserService } from 'src/_services/user.service';
import { FacilityService } from 'src/_services/facility.service';
import { TaskService } from 'src/_services/task.service';
import { LocationService } from 'src/_services/location.service';

@Component({
  selector: 'app-edit-button-renderer',
  template: `<div class="icon-wrapper d-flex align-items-center" >
                <i (click)="onEditClick()" *ngIf="renderButton()" class="fa-regular fa-pen-to-square ag-clickable"></i></div>`,
  styleUrls: ['../renderers.css']
})
export class EditButtonRendererComponent implements ICellRendererAngularComp {

  projectleaderAccess = projectleaderAccess;
  private params: any;
  objectPerms: any;
  permissionGroup!: string;
  private permissionGroupSubscription: Subscription;

  constructor(
    private modalService: NgbModal,
    private authService: AuthService,
    private projectService: ProjectService,
    private departmentService: DepartmentService,
    private divisionService: DivisionService,
    private userService: UserService,
    private facilityService: FacilityService,
    private taskService: TaskService,
    private locationService: LocationService
  ) {
    this.permissionGroupSubscription = this.authService.permissionGroup$.subscribe(group => {
      this.permissionGroup = group;
    });
  }

  agInit(params: any): void {
    this.params = params;
    switch (this.params.routeType) {
      case 'project':
        this.authService.projectPerms$.subscribe(projectPerms => {
          this.objectPerms = projectPerms;
        });
        break;
      case 'task':
        this.authService.taskPerms$.subscribe(taskPerms => {
          this.objectPerms = taskPerms;
        });
        break;
      case 'document':
        this.authService.documentPerms$.subscribe(documentPerms => {
          this.objectPerms = documentPerms;
        });
        break;
      case 'image':
        this.authService.imagePerms$.subscribe(imagePerms => {
          this.objectPerms = imagePerms;
        });
        break;
    }
  }

  refresh(params: ICellRendererParams): boolean {
    return true;
  }

  onEditClick() {
    console.log('edit:', this.params.routeType, this.params.value);
    // console.log(this.params);

    const modalRef = this.modalService.open(FormContainerComponent, { size: 'xl' });
    modalRef.componentInstance.context = this.params.context
    modalRef.componentInstance.routeType = this.params.routeType;
    modalRef.componentInstance.data = this.params.data;
    modalRef.componentInstance.identifier = this.params.value;
    modalRef.componentInstance.addOrEdit = 'edit';

    modalRef.result.then(() => {
      this.refreshList();
    });

  }

  // true/false logic
  renderButton() {
    if (!['project', 'document', 'image'].includes(this.params.routeType)) { return true }
    //object level permissions for project edit buttons.
    return this.objectPerms.includes(String(this.params.data.id));
  }

  refreshList() {
    switch (this.params.routeType) {
      case 'department':
        this.departmentService.refreshDepartments().subscribe();
        break;
      case 'division':
        this.divisionService.refreshDivisions().subscribe();
        break;
      case 'facility':
        this.facilityService.refreshFacilities().subscribe();
        break;
      case 'location':
        this.locationService.refreshLocations().subscribe();
        break;
      case 'project':
        this.projectService.refreshProjects().subscribe();
        break;
      case 'task':
        this.taskService.refreshTasks().subscribe();
        break;
      case 'users':
        this.userService.refreshUsers().subscribe();
        break;
    }
  }

}
