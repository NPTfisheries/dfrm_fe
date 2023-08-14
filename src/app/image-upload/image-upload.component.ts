import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AlertService } from 'src/_services/alert.service';
import { BackendService } from 'src/_services/backend.service';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent implements OnInit {
  imageForm!: FormGroup;
  selectedImage: File | undefined;
  imagePreview: string | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private backendService: BackendService,
    private alertService: AlertService,
  ) { }

  ngOnInit(): void {
    this.imageForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      photographer: ['', Validators.required],
      source: ['', Validators.required]
    })
  }

  get f() { return this.imageForm.controls; }

  onFileChange(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      const newSelectedImage = event.target.files[0];
      if (newSelectedImage) {
        this.selectedImage = newSelectedImage;
        this.imagePreview = URL.createObjectURL(newSelectedImage);
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
    formData.append('image', this.selectedImage);

    this.backendService.post('/api/v1/image/', formData).subscribe({
      next: () => {
        this.alertService.success('Image successfully uploaded!.', { autoClose: true });
        this.imageForm.reset();
      },
      error: (err) => {
        this.alertService.error('Failed to upload image.', { autoClose: true })
        console.log(err);
      }
    });
  }

}
