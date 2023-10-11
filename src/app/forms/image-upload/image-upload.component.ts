import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from 'src/_services/alert.service';
import { BackendService } from 'src/_services/backend.service';

import { ListPageComponent } from 'src/app/list-page/list-page.component';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html'
})
export class ImageUploadComponent implements OnInit {

  @Input() context!: ListPageComponent 

  imageForm!: FormGroup;
  selectedImage: File | undefined;
  imagePreview: string | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private backendService: BackendService,
    private alertService: AlertService,
    private activeModal: NgbActiveModal,
  ) { }

  ngOnInit(): void {
    this.imageForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      photographer: ['', Validators.required],
      source: ['', Validators.required],
      photo_date: ['', Validators.required]
    })
  }

  get f() { return this.imageForm.controls; }

  onFileChange(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      const newProfilePhoto = event.target.files[0];
      if (newProfilePhoto) {
        this.selectedImage = newProfilePhoto;
        this.imagePreview = URL.createObjectURL(newProfilePhoto);
      }
    }
  }

  onSubmit(): void {
    if (this.imageForm.invalid || !this.selectedImage) {
      return;
    }

    const formData = new FormData();
    formData.append('name', this.f['name'].value);
    formData.append('description', this.f['description'].value);
    formData.append('photographer', this.f['photographer'].value);
    formData.append('source', this.f['source'].value);
    formData.append('photo_date', this.f['photo_date'].value);
    formData.append('image', this.selectedImage);

    this.backendService.newItem('image', formData).subscribe({
      next: () => {
        this.backendService.getList('image').subscribe((updatedList: any) => {
          this.context.data = updatedList;
          this.activeModal.close('success');
        });
      },
      error: (err) => {
        this.alertService.error('Failed to upload image.', { autoClose: true })
        console.log(err);
      }
    });
  }

}
