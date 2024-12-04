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

  employee_authors: string = '';

  constructor(
    private activeModal: NgbActiveModal,
  ) { }

  ngOnInit(): void {
    // console.log('Document:', this.document);
    console.log(this.document.employee_authors);
    this.employee_authors = this.document.employee_authors
      .map((author:any) => author.full_name)
      .join('; ');
  }

  download() {
    console.log("Download!");
    const documentUrl = this.document.document.replace('backend:8000', 'localhost:8000');
    window.open(documentUrl, '_blank');
  }

}
