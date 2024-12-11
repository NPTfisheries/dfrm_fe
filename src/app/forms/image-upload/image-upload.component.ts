import { Component, OnInit, Input, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from 'src/_services/alert.service';
import { BackendService } from 'src/_services/backend.service';
import { ImageService } from 'src/_services/image.service';
import { Subscription } from 'rxjs';
import { ListPageComponent } from 'src/app/list-page/list-page.component';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html'
})
export class ImageUploadComponent implements OnInit {

  @Input() context!: ListPageComponent

  form!: FormGroup;
  isSubmitting: boolean = false;

  private formChangesSubscription!: Subscription;

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
      photo_date: ['', Validators.required],
      image: [null, Validators.required]
    });

    // subscribe to form changes (good debugger)
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

    this.backendService.newItem('images', formData).subscribe({
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
