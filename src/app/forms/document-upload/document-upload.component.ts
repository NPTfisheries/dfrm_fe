import { Component, OnInit, Input, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';

import { DocumentsComponent } from '../../documents/documents.component';
import { UserService } from 'src/_services/user.service';
import { DocumentService } from 'src/_services/document.service';
import { User } from 'src/_models/interfaces';
import { BackendService } from 'src/_services/backend.service';
import { AlertService } from 'src/_services/alert.service';
import { AuthService } from 'src/_services/auth.service';

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
    private backendService: BackendService,
    private userService: UserService,
    private authService: AuthService,
    private documentService: DocumentService,
    private alertService: AlertService,
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
    });

    // subscribe to form changes
    // this.form.valueChanges.subscribe(() => {
    //   console.log('Form Valid:', this.form.valid);
    //   console.log('Form Value:', this.form.value);
    // });
  }

  get f() { return this.form.controls; }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    this.isSubmitting = true;

    const formData = new FormData();
    Object.keys(this.form.controls).forEach(key => {
      const value = this.form.get(key)?.value;
      if (value instanceof FileList) {
        // Handle file inputs
        formData.append(key, value[0]);
      } else {
        formData.append(key, value);
      }
    });

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




