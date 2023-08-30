import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-edit-button-renderer',
  template: `<button class="ag-button" ><i  class="fa-regular fa-pen-to-square"></i></button>`,
  // template: `<button (click)="edit('project', x.slug)"><i  class="fa-regular fa-pen-to-square"></i></button>`,
  styleUrls: ['./edit-button-renderer.component.css']
})
export class EditButtonRendererComponent implements ICellRendererAngularComp{
  slug = '';

  agInit(params: any): void {
    this.slug = params.value || '';
  }

  refresh(params: ICellRendererParams): boolean {
    this.slug = params.value || '';
    return true;
  }

}
