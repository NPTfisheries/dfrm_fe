import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-document-preview',
  template: `<div class="icon-wrapper"><i (click)="previewDocument()" class="fa-regular fa-eye ag-clickable"></i></div>`,
  styleUrls: ['../renderers.css']
})
export class DocumentPreviewRendererComponent implements ICellRendererAngularComp {
  private params: any;

  agInit(params: any): void {
    this.params = params;
  }

  refresh(params: ICellRendererParams): boolean {
    return true;
  }

  previewDocument() {
    // console.log(`Previewing document: ${this.params.data.document}`);
    const documentUrl = this.params.data.document.replace('backend:8000', 'localhost:8000');
    window.open(documentUrl, '_blank');
  }

}
