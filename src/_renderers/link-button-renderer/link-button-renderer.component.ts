import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-link-button-renderer',
  template: `<button class='ag-button' [routerLink]="this.slug"><i class="fa-regular fa-eye"></i></button>`,
  styles: [`
  .ag-button {
      background-color: transparent;
      border: none;    
    }
  `]
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