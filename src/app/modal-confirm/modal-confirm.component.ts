import { Component, Input, HostListener } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DocumentsComponent } from '../documents/documents.component';

import { BackendService } from 'src/_services/backend.service';

@Component({
  selector: 'app-modal-confirm',
  templateUrl: './modal-confirm.component.html'
})
export class ModalConfirmComponent {

  @Input() context!: DocumentsComponent
  @Input() routeType!: string;  // document OR image
  @Input() identifier!: string; // pk of document/image to delete

  isSubmitting: boolean = false;

  constructor(
    private backendService: BackendService,
    private activeModal: NgbActiveModal,
  ) {  }

  delete() {
    // run delete
    this.isSubmitting = true;
    this.backendService.deleteFile(this.routeType, this.identifier).subscribe((response: any) => {
      // update data, we can simply filter list on a delete.
      console.log('delete response:', response);
      this.context.data = this.context.data.filter((file) => file.id != this.identifier);
      this.activeModal.close();
    });
  }

  cancel() {
    console.log('Delete operation cancelled. Closing modal.');
    this.activeModal.close();
  }

  @HostListener('window:popstate', ['$event'])
  onPopState(event: PopStateEvent) {
    this.activeModal.close();
  }
  
}
