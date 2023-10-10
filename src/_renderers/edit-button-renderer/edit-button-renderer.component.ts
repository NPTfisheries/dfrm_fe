import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormContainerComponent } from 'src/app/forms/form-container/form-container.component';

import { AuthService } from 'src/_services/auth.service';

@Component({
  selector: 'app-edit-button-renderer',
  template: `<div class="icon-wrapper">
                <i (click)="onEditClick()" *ngIf="renderButton()" class="fa-regular fa-pen-to-square ag-clickable"></i></div>`,
  styleUrls: ['../renderers.css']
})
export class EditButtonRendererComponent implements ICellRendererAngularComp {


  private params: any;
  projectPerms: any;

  constructor(
    private modalService: NgbModal,
    private authService: AuthService,
  ) { }

  agInit(params: any): void {
    this.params = params;
    if(this.params.routeType === 'project') {
      this.authService.projectPerms$.subscribe(projectPerms => {
        this.projectPerms = projectPerms;
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

  renderButton() {
    if(this.params.routeType !== 'project') { return true }
    //object level permissions for project edit buttons.
    return this.projectPerms.includes(String(this.params.data.id));
  }

}
