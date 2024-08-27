import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from 'src/_services/alert.service';
import { BackendService } from 'src/_services/backend.service';
import { ImageService } from 'src/_services/image.service';

import { ListPageComponent } from 'src/app/list-page/list-page.component';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html'
})
export class ImageUploadComponent implements OnInit {

  @Input() context!: ListPageComponent

  form!: FormGroup;
  selectedImage: File | undefined;
  imagePreview: string | undefined;
  isSubmitting: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private backendService: BackendService,
    private imageService: ImageService,
    private alertService: AlertService,
    private activeModal: NgbActiveModal,
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      photographer: ['', Validators.required],
      source: ['', Validators.required],
      photo_date: ['', Validators.required]
    })
  }

  get f() { return this.form.controls; }

  onFileChange(selectedFile: File | undefined): void {
    this.selectedImage = selectedFile;
    if (this.selectedImage) {
      this.imagePreview = URL.createObjectURL(this.selectedImage);
    } else {
      this.imagePreview = undefined;
    }
  }


  onSubmit(): void {
    if (this.form.invalid || !this.selectedImage) {
      return;
    }

    this.isSubmitting = true;

    const formData = new FormData();
    formData.append('name', this.f['name'].value);
    formData.append('description', this.f['description'].value);
    formData.append('photographer', this.f['photographer'].value);
    formData.append('source', this.f['source'].value);
    formData.append('photo_date', this.f['photo_date'].value);
    formData.append('image', this.selectedImage);

    this.backendService.newItem('image', formData).subscribe({
      next: () => {
        this.imageService.refreshImages().subscribe((updatedList: any) => {
          this.context.data = updatedList;
          this.activeModal.close('success');
        });
      },
      error: (err) => {
        this.alertService.error('Failed to upload image.', { autoClose: true })
        console.log(err);
        this.isSubmitting = false;
      }
    });
  }

}
