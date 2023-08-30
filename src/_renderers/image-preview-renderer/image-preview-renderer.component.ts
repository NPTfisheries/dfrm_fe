import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

import { ImagePreviewComponent } from 'src/app/image-preview/image-preview.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-image-preview-renderer',
  template: `<button class='ag-button' (click)="previewImage()"><i class="fa-regular fa-eye"></i></button>`,
  styles: [`
  .ag-button {
      background-color: transparent;
      border: none;    
    }
  `]
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
    console.log('edit:', this.params.routeType, this.params.value);
    console.log(this.params);

    const modalRef = this.modalService.open(ImagePreviewComponent, { size: 'xl' });
  }
}
