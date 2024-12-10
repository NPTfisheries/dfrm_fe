import { Component, OnInit, Input, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from 'src/_services/alert.service';
import { BackendService } from 'src/_services/backend.service';
import { AuthService } from 'src/_services/auth.service';

import { DocumentsComponent } from '../../documents/documents.component';
import { UserService } from 'src/_services/user.service';
import { DocumentService } from 'src/_services/document.service';
import { LookUp } from 'src/_models/interfaces';

@Component({
  selector: 'app-document-upload',
  templateUrl: './document-upload.component.html',
  styleUrls: ['./document-upload.component.css']
})
export class DocumentUploadComponent implements OnInit {
  @Input() context!: DocumentsComponent

  form!: FormGroup;
  isSubmitting: boolean = false;
  selectedAuthors: any[] = [];
  selectedDocument: File | undefined;

  // options for select menus
  document_types: any[] = [];
  author_choices!: any;

  constructor(
    private formBuilder: FormBuilder,
    private backendService: BackendService,
    private userService: UserService,
    private documentService: DocumentService,
    private alertService: AlertService,
    private authService: AuthService,
    private activeModal: NgbActiveModal,
  ) { }

  ngOnInit(): void {
    this.documentService.getDocumentTypes().subscribe(document_types => {
      let options: { key: any, value: any }[] = []; // should be strings, but did any to get rid of error.
      for (let type of document_types) {
        options.push({ key: type.id, value: type.name })
      }
      this.document_types = options;
    })

    this.author_choices = this.buildEmployeeOptions();

    this.form = this.formBuilder.group({
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

  get f() { return this.form.controls; }

  onFileChange(selectedFile: File | undefined): void {
    this.selectedDocument = selectedFile;
  }

  onSubmit(): void {
    if (this.form.invalid || !this.selectedDocument) {
      return;
    }

    this.isSubmitting = true;

    const formData = new FormData();
    formData.append('title', this.f['title'].value);
    formData.append('description', this.f['description'].value);
    formData.append('primary_author', this.f['primary_author'].value);

    // formData.append('employee_authors', this.f['employee_authors'].value);
    const chosenAuthors = this.f['employee_authors'].value;
    for (let i = 0; i < chosenAuthors.length; i++) {
      formData.append(`employee_authors`, chosenAuthors[i]);
    }

    formData.append('publish_date', this.f['publish_date'].value);
    formData.append('document_type', this.f['document_type'].value);
    formData.append('citation', this.f['citation'].value);
    formData.append('keywords', this.f['keywords'].value);
    formData.append('document', this.selectedDocument);

    this.backendService.newItem('documents', formData).subscribe({
      next: () => {
        this.documentService.refreshDocuments().subscribe((updatedList: any) => {
          this.context.data = updatedList;
          this.authService.refreshPermissions().subscribe();
          this.activeModal.close('success');
        });
      },
      error: (err) => {
        this.alertService.error('Failed to upload document.', { autoClose: true })
        console.log(err);
        this.isSubmitting = false;
      }
    });
  }

  // for employees
  private buildEmployeeOptions() {
    let options: { key: string, value: string }[] = [];

    this.userService.getUsers().subscribe((employees: any) => {
      for (let emp of employees) {
        options.push({ key: emp.id, value: emp.full_name })
      }
    });

    return options;
  }

  updateAuthors() {
    console.log('updating selectedAuthors to:', this.form.get(`employee_authors`));
    this.form.get(`employee_authors`)?.patchValue(this.selectedAuthors);
  }

  @HostListener('window:popstate', ['$event'])
  onPopState(event: PopStateEvent) {
    this.activeModal.close();
  }

}




