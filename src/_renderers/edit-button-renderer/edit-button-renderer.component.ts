import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormContainerComponent } from 'src/app/forms/form-container/form-container.component';


@Component({
  selector: 'app-edit-button-renderer',
  template: `<button class="ag-button" (click)="onEditClick()"><i  class="fa-regular fa-pen-to-square"></i></button>`,
  styleUrls: ['./edit-button-renderer.component.css']
})
export class EditButtonRendererComponent implements ICellRendererAngularComp {


  private params:any;

  constructor(
    private modalService: NgbModal,
  ) {}

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

    modalRef.componentInstance.routeType = this.params.routeType;
    modalRef.componentInstance.slug = this.params.value;
    modalRef.componentInstance.data = this.params.data;

    modalRef.result.then((result) => {
      modalRef.componentInstance.updateList.subscribe((newList: any) => {        
        this.params.context.rowData = newList;
        this.params.context.alertService.success(`Edit ${this.params.routeType} successful!`, { autoClose: true });
      });
    }).catch((reason) => { }); // prevents error on exiting modal by clicking outside.
  }

}
