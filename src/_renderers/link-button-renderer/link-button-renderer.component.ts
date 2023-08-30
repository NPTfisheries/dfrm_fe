import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-link-button-renderer',
  template: `<button class="dfrm-button" [routerLink]="this.slug"><i class="fa-regular fa-eye"></i></button>`,
})
export class LinkButtonRendererComponent implements ICellRendererAngularComp{
  slug = '';

  agInit(params: any): void {
    this.slug = params.value || '';
  }

  refresh(params:any): boolean {
    this.slug = params.value || '';
    return true;
  }

}