import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-link-button-renderer',
  template: `<button class='ag-button' [routerLink]="this.slug"><i class="fa-regular fa-eye"></i></button>`,
  // template: `<i class="fa-regular fa-eye" [routerLink]="this.slug"></i>`,
  styleUrls: ['./link-button-renderer.component.css']
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