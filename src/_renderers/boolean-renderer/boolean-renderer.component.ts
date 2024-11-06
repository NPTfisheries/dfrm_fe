import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-boolean-renderer',
  template:  `<div class="icon-wrapper"><i [class]="icon_class" [style]="icon_style"></i><div>`,
  styleUrls: ['../renderers.css']
})
export class BooleanRendererComponent implements ICellRendererAngularComp {

  icon_class : string | undefined 
  icon_style: string | undefined

  agInit(params: any): void {
    // console.log('bool renderer params:', params);
    if(params.value) {
      this.icon_class = 'fa-regular fa-square-check fa-xl';
      this.icon_style = 'color: green;';
    } else {
      this.icon_class = 'fa-regular fa-circle-xmark fa-xl';
      this.icon_style = 'color: red';
    }
  }

  refresh(params: ICellRendererParams) {
    return true;
  }
}
