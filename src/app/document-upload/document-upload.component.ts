import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from 'src/_services/alert.service';
import { BackendService } from 'src/_services/backend.service';

import { DocumentsComponent } from '../documents/documents.component';

@Component({
  selector: 'app-document-upload',
  templateUrl: './document-upload.component.html',
  styleUrls: ['./document-upload.component.css']
})
export class DocumentUploadComponent implements OnInit {
  @Input() context!: DocumentsComponent 

  documentForm!: FormGroup;
  selectedDocument: File | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private backendService: BackendService,
    private alertService: AlertService,
    private activeModal: NgbActiveModal,
  ) { }

  ngOnInit(): void {
    this.documentForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      primary_author: ['', Validators.required],
      employee_authors: [''],
      publish_date: ['', Validators.required],
      document_type: ['', Validators.required],
      citation: [''],
      keywords: ['']
    })
  }

  get f() { return this.documentForm.controls; }

  onFileChange(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      const newDocument = event.target.files[0];
      if (newDocument) {
        this.selectedDocument = newDocument;
      }
    }
  }

  onSubmit(): void {
    if (this.documentForm.invalid || !this.selectedDocument) {
      return;
    }

    const formData = new FormData();
    formData.append('title', this.f['title'].value);
    formData.append('description', this.f['description'].value);
    formData.append('primary_author', this.f['primary_author'].value);
    formData.append('employee_authors', this.f['employee_authors'].value);
    formData.append('publish_date', this.f['publish_date'].value);
    formData.append('document_type', this.f['document_type'].value);
    formData.append('citation', this.f['citation'].value);
    formData.append('keywords', this.f['keywords'].value);
    formData.append('document', this.selectedDocument);

    this.backendService.newItem('document', formData).subscribe({
      next: () => {
        this.backendService.getList('document').subscribe((updatedList: any) => {
          this.context.data = updatedList;
          this.activeModal.close('success');
        });
      },
      error: (err) => {
        this.alertService.error('Failed to upload document.', { autoClose: true })
        console.log(err);
      }
    });
  }

}



  
