import { Component, OnInit, Input, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';

import { DocumentsComponent } from '../../documents/documents.component';
import { UserService } from 'src/_services/user.service';
import { DocumentService } from 'src/_services/document.service';
import { User } from 'src/_models/interfaces';

@Component({
  selector: 'app-document-upload',
  templateUrl: './document-upload.component.html',
  styleUrls: ['./document-upload.component.css']
})
export class DocumentUploadComponent implements OnInit {
  @Input() context!: DocumentsComponent

  form!: FormGroup;
  isSubmitting: boolean = false;

  // options for select menus
  document_types: any[] = [];
  author_choices!: User[] | any;

  private formChangesSubscription!: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private documentService: DocumentService,
    private activeModal: NgbActiveModal,
  ) { }

  ngOnInit(): void {
    this.documentService.getDocumentTypes().subscribe(document_types => {
      this.document_types = document_types.map(type => ({ key: type.id, value: type.name }));
    })

    this.userService.getUsers().subscribe(users => {
      this.author_choices = users;
    });

    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      primary_author: ['', Validators.required],
      employee_authors: [''],
      publish_date: ['', Validators.required],
      document_type: ['', Validators.required],
      citation: [''],
      keywords: [''],
      document: [null, Validators.required]
    })

    // subscribe to form changes
    this.form.valueChanges.subscribe(() => {
      console.log('Form Valid:', this.form.valid);
      console.log('Form Value:', this.form.value);
    });
  }

  get f() { return this.form.controls; }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    this.isSubmitting = true;

    // const formData = new FormData();
    // formData.append('title', this.f['title'].value);
    // formData.append('description', this.f['description'].value);
    // formData.append('primary_author', this.f['primary_author'].value);
    // const chosenAuthors = this.f['employee_authors'].value;
    // chosenAuthors.forEach((author: any) => formData.append('employee_authors', author));
    // formData.append('publish_date', this.f['publish_date'].value);
    // formData.append('document_type', this.f['document_type'].value);
    // formData.append('citation', this.f['citation'].value);
    // formData.append('keywords', this.f['keywords'].value);
    // formData.append('document', this.f['document'].value);

    // this.backendService.newItem('documents', formData).subscribe({
    //   next: () => {
    //     this.documentService.refreshDocuments().subscribe((updatedList: any) => {
    //       this.context.data = updatedList;
    //       this.authService.refreshPermissions().subscribe();
    //       this.activeModal.close('success');
    //     });
    //   },
    //   error: (err) => {
    //     this.alertService.error('Failed to upload document.', { autoClose: true })
    //     console.log(err);
    //     this.isSubmitting = false;
    //   }
    // });
  }

  ngOnDestroy(): void {
    if (this.formChangesSubscription) {
      this.formChangesSubscription.unsubscribe();
    }
  }

  @HostListener('window:popstate', ['$event'])
  onPopState(event: PopStateEvent) {
    this.activeModal.close();
  }

}




