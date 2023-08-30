import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-link-button-renderer',
  template: `<div class="icon-wrapper"><i [routerLink]="this.slug" class="fa-regular fa-eye ag-clickable"></i><div>`,
  styleUrls: ['../renderers.css']
})

export class LinkButtonRendererComponent implements ICellRendererAngularComp{
  slug = '';

  agInit(params: any): void {
    this.slug = params.value || '';
  }

  refresh(params: ICellRendererParams): boolean {
    this.slug = params.value || '';
    return true;
  }

}