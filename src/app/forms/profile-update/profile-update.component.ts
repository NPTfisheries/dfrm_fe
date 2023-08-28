import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { BackendService } from 'src/_services/backend.service';

import { AlertService } from 'src/_services/alert.service';
import { phoneFormatValidator } from 'src/_validators/phone-format-validator';

@Component({
  selector: 'app-profile-update',
  templateUrl: './profile-update.component.html',
  styleUrls: ['./profile-update.component.css']
})
export class ProfileUpdateComponent {

  @Input() user: any | undefined; // received from profile component
  @Output() userUpdated = new EventEmitter<any>();

  form!: FormGroup;
  loading = false;
  submitted = false;
  profile: any | undefined;
  selectedImage: File | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private backendService: BackendService,
    private alertService: AlertService,
    private activeModal: NgbActiveModal,
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      title: [this.user.profile.title], //, Validators.required],
      bio: [this.user.profile.bio],
      city: [this.user.profile.city],
      state: [this.user.profile.state],
      mobile_phone: [this.user.profile.mobile_phone, [phoneFormatValidator()]],
      work_phone: [this.user.profile.work_phone, [phoneFormatValidator()]],
      // photo: [this.user.profile.photo]
    })
  }

  get f() { return this.form.controls; }

  onFileChange(event: any): void {
    console.log('FILE CHANGE', event);
    if (event.target.files && event.target.files.length > 0) {
      const newSelectedImage = event.target.files[0];
      if (newSelectedImage) {
        this.selectedImage = newSelectedImage;
      }
    }
  }

  onSubmit(): void {
    this.submitted = true;
    this.loading = true;

    // stop here if form is invalid
    if (this.form.invalid || !this.selectedImage) {
      console.log('form invalid');
      this.loading = false;
      return;
    }

    console.log('Updating Profile...');
    // since we are including an image file (photo), we need to prepare the submission differently than normal.
    const formData = new FormData();

    formData.append('title', this.f['title'].value);
    formData.append('bio', this.f['bio'].value);
    formData.append('city', this.f['city'].value);
    formData.append('state', this.f['state'].value);
    formData.append('mobile_phone', this.f['mobile_phone'].value);
    formData.append('work_phone', this.f['work_phone'].value);
    formData.append('photo', this.selectedImage);
    
    this.backendService.updateProfile(formData)
      .subscribe({
        next: () => {
          this.backendService.getCurrentUser().subscribe(currentUser => {
            this.userUpdated.emit(currentUser);  // send back updated user information to ProfileComponent
            this.alertService.success('Profile updated!', { autoClose: true });
            this.loading = false;
            this.submitted = false;
          });
          this.activeModal.close();
        },
        error: (response) => {
          console.log(response);
          this.alertService.error('Register New User Failed! Check your fields and try again.', { id: 'alert-modal', autoClose: true });
          this.loading = false;
        }
      });


    // console.log('Updating Profile...', this.form.value);

    // this.backendService.put('/api/v1/user/', this.form.value)
    //   .subscribe({
    //     next: (updatedUser) => {
    //       this.userUpdated.emit(updatedUser);  // send back updated user information to ProfileComponent
    //       this.alertService.success('Profile updated!', { autoClose: true });
    //       this.loading = false;
    //       this.submitted = false;
    //       this.activeModal.close();
    //     },
    //     error: (response) => {
    //       console.log(response);
    //       this.alertService.error('Register New User Failed! Check your fields and try again.', { id: 'alert-modal', autoClose: true });
    //       this.loading = false;
    //     }
    //   });

  }

}

