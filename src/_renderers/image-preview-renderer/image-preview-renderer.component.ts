import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

import { ImagePreviewComponent } from 'src/app/image-preview/image-preview.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-image-preview-renderer',
  template: `<div class="icon-wrapper"><i (click)="previewImage()" class="fa-regular fa-eye ag-clickable"></i></div>`,
  styleUrls: ['../renderers.css']

})
export class ImagePreviewRendererComponent implements ICellRendererAngularComp {
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

  previewImage() {
    // console.log('previewImage:', this.params);

    const imageUrl = this.params.data.image.replace('localhost:4200', 'localhost:8000');

    const modalRef = this.modalService.open(ImagePreviewComponent, { size: 'xl', centered: true, fullscreen: true });
    modalRef.componentInstance.imageUrl = imageUrl;
  }
}
