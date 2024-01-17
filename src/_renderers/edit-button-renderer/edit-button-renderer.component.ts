import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormContainerComponent } from 'src/app/forms/form-container/form-container.component';

import { projectleaderAccess } from 'src/_utilities/permission-util';
import { AuthService } from 'src/_services/auth.service';

@Component({
  selector: 'app-edit-button-renderer',
  template: `<div class="icon-wrapper d-flex align-items-center" >
                <i (click)="onEditClick()" *ngIf="renderButton()" class="fa-regular fa-pen-to-square ag-clickable"></i></div>`,
  styleUrls: ['../renderers.css']
})
export class EditButtonRendererComponent implements ICellRendererAngularComp {

  projectleaderAccess=projectleaderAccess;
  private params: any;
  objectPerms: any;
  permissionGroup!: string;
  private permissionGroupSubscription: Subscription;

  constructor(
    private modalService: NgbModal,
    private authService: AuthService,
  ) {
    this.permissionGroupSubscription = this.authService.permissionGroup$.subscribe(group => {
      this.permissionGroup = group;
    });
   }

  agInit(params: any): void {
    this.params = params;
    if(this.params.routeType === 'project') {
      this.authService.projectPerms$.subscribe(projectPerms => {
        this.objectPerms = projectPerms;
      });
    }
    if(this.params.routeType === 'document') {
      this.authService.documentPerms$.subscribe(documentPerms => {
        this.objectPerms = documentPerms;
      });
    }
    if(this.params.routeType === 'image') {
      this.authService.imagePerms$.subscribe(imagePerms => {
        this.objectPerms = imagePerms;
      });
    }
  }

  refresh(params: ICellRendererParams): boolean {
    return true;
  }

  onEditClick() {
    // console.log('edit:', this.params.routeType, this.params.value);
    // console.log(this.params);

    const modalRef = this.modalService.open(FormContainerComponent, { size: 'xl' });
    modalRef.componentInstance.context = this.params.context
    modalRef.componentInstance.routeType = this.params.routeType;
    modalRef.componentInstance.data = this.params.data;
    modalRef.componentInstance.identifier = this.params.value;
    modalRef.componentInstance.addOrEdit = 'edit';
  }

  // true/false logic
  renderButton() {
    if(!['project', 'document', 'image'].includes(this.params.routeType)) { return true }
    //object level permissions for project edit buttons.
    return this.objectPerms.includes(String(this.params.data.id));
  }

}
