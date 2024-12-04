import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Document } from 'src/_models/interfaces';

@Component({
  selector: 'app-document-info',
  templateUrl: './document-info.component.html',
  styleUrls: ['./document-info.component.css']
})
export class DocumentInfoComponent {

  @Input() document!: Document | any | undefined;

  constructor(
    private activeModal: NgbActiveModal,
  ) { }

  ngOnInit(): void {
    // console.log('Document:', this.document);
  }

  download() {
    console.log("Download!");
    const documentUrl = this.document.document.replace('backend:8000', 'localhost:8000');
    window.open(documentUrl, '_blank');
  }

}
