import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalConfirmComponent } from 'src/app/modal-confirm/modal-confirm.component';

import { projectleaderAccess } from 'src/_utilities/permission-util';
import { AuthService } from 'src/_services/auth.service';

@Component({
  selector: 'app-delete-button-renderer',
  template: `<div class="icon-wrapper">
                <i (click)="onDeleteClick()" *ngIf="renderButton()" class="fa-regular fa-trash-can ag-clickable"></i></div>`,
  styleUrls: ['../renderers.css']
})
export class DeleteButtonRendererComponent implements ICellRendererAngularComp {

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

  onDeleteClick() {
    console.log('DELETE BUTTON CLICKED', this.params.routeType, this.params.value);
    console.log(this.objectPerms);
    // console.log(this.params);

    const modalRef = this.modalService.open(ModalConfirmComponent, { size: 'sm' });
    modalRef.componentInstance.context = this.params.context
    modalRef.componentInstance.routeType = this.params.routeType;
    modalRef.componentInstance.identifier = this.params.value;
  }

  // true/false logic
  renderButton() {
    if(!['document', 'image'].includes(this.params.routeType)) { return true }
    //object level permissions for project edit buttons.
    return this.objectPerms.includes(String(this.params.data.id));
  }

}
