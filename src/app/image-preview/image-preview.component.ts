import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-image-preview',
  templateUrl: './image-preview.component.html',
  styleUrls: ['./image-preview.component.css']
})
export class ImagePreviewComponent {

  @Input() imageUrl!: string | undefined;

  constructor(
    private activeModal: NgbActiveModal,
  ) { }

  closeModal() {
    this.activeModal.close();
  }

}
