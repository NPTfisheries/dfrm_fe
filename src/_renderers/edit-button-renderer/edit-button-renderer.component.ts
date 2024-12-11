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
import { ImageService } from 'src/_services/image.service';

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
    private locationService: LocationService,
    private imageService: ImageService,
  ) {
    this.permissionGroupSubscription = this.authService.permissionGroup$.subscribe(group => {
      this.permissionGroup = group;
    });
  }

  agInit(params: any): void {
    this.params = params;
    this.getObjPerms();
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
      this.authService.refreshPermissions().subscribe(); 
      this.getObjPerms();
    });

  }

  // true/false logic
  renderButton() {
    if (!['projects', 'tasks', 'documents', 'images'].includes(this.params.routeType)) { return true }
    //object level permissions for project edit buttons.
    return this.objectPerms.includes(String(this.params.data.id));
  }

  refreshList() {
    console.log(this.params.routeType);
    switch (this.params.routeType) {
      case 'departments':
        this.departmentService.refreshDepartments().subscribe();
        break;
      case 'divisions':
        this.divisionService.refreshDivisions().subscribe();
        break;
      case 'facilities':
        this.facilityService.refreshFacilities().subscribe();
        break;
      case 'images':
        this.imageService.refreshImages().subscribe();
        break;
      case 'locations':
        this.locationService.refreshLocations().subscribe();
        break;
      case 'projects':
        this.projectService.refreshProjects().subscribe();
        break;
      case 'tasks':
        this.taskService.refreshTasks().subscribe();
        break;
      case 'users':
        this.userService.refreshUsers().subscribe();
        break;
    }
  }


  // WE need to refresh obj perms.
  getObjPerms(){
    switch (this.params.routeType) {
      case 'projects':
        this.authService.projectPerms$.subscribe(projectPerms => {
          this.objectPerms = projectPerms;
        });
        break;
      case 'tasks':
        this.authService.taskPerms$.subscribe(taskPerms => {
          this.objectPerms = taskPerms;
        });
        break;
      case 'documents':
        this.authService.documentPerms$.subscribe(documentPerms => {
          this.objectPerms = documentPerms;
        });
        break;
      case 'images':
        this.authService.imagePerms$.subscribe(imagePerms => {
          this.objectPerms = imagePerms;
        });
        break;
    }
  }
}
