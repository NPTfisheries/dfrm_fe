import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormContainerComponent } from 'src/app/forms/form-container/form-container.component';


@Component({
  selector: 'app-edit-button-renderer',
  template: `<div class="icon-wrapper"><i (click)="onEditClick()" class="fa-regular fa-pen-to-square ag-clickable"></i></div>`,
  styleUrls: ['../renderers.css']
})
export class EditButtonRendererComponent implements ICellRendererAngularComp {


  private params: any;

  constructor(
    private modalService: NgbModal,
  ) { }

  agInit(params: any): void {
    this.params = params;
  }

  refresh(params: ICellRendererParams): boolean {
    return true;
  }

  onEditClick() {
    console.log('edit:', this.params.routeType, this.params.value);
    console.log(this.params);

    const modalRef = this.modalService.open(FormContainerComponent, { size: 'xl' });
    modalRef.componentInstance.context = this.params.context
    modalRef.componentInstance.routeType = this.params.routeType;
    modalRef.componentInstance.data = this.params.data;
    modalRef.componentInstance.slug = this.params.value;
  }

}
