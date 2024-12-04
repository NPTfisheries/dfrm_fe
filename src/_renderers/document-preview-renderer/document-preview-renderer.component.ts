import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DocumentInfoComponent } from 'src/app/documents/document-info/document-info.component';

@Component({
  selector: 'app-document-preview',
  template: `<div class="icon-wrapper"><i (click)="previewDocument()" class="fa-regular fa-eye ag-clickable"></i></div>`,
  styleUrls: ['../renderers.css']
})
export class DocumentPreviewRendererComponent implements ICellRendererAngularComp {
  private params: any;

  constructor(
    private modalService: NgbModal,
   ) {}

  agInit(params: any): void {
    this.params = params;
  }

  refresh(params: ICellRendererParams): boolean {
    return true;
  }

  // open document info modal
  previewDocument() {
    const modalRef = this.modalService.open(DocumentInfoComponent, { size: 'xl', centered: true });
    modalRef.componentInstance.document = this.params.data;
  }

}
