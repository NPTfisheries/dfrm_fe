import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { BackendService } from 'src/_services/backend.service';
import { Profile } from 'src/_models/profile';

import { AlertService } from 'src/_services/alert.service';

@Component({
  selector: 'app-profile-update',
  templateUrl: './profile-update.component.html',
  styleUrls: ['./profile-update.component.css']
})
export class ProfileUpdateComponent {

  @Input() user: any | undefined; // received from profile component
  @Output() userUpdated = new EventEmitter<any>();

  form!: FormGroup;
  profileFormGroup!: FormGroup;
  loading = false;
  submitted = false;
  profile: any | undefined;

  constructor(
    private backendService: BackendService,
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    private activeModal: NgbActiveModal,
  ) { }

  // helpers for form and nested form
  get f() { return this.form.controls; }
  get fp() { return this.profileFormGroup.controls; }

  ngOnInit() {
    this.profileFormGroup = this.formBuilder.group({
      title: [this.user.profile.title], //, Validators.required],
      bio: [this.user.profile.bio],
      city: [this.user.profile.city],
      state: [this.user.profile.state],
      mobile_phone: [this.user.profile.mobile_phone, [Validators.maxLength(10)]],
      work_phone: [this.user.profile.work_phone] //,
      // photo: [this.user.profile.photo]
    })

    this.form = this.formBuilder.group({
      email: [this.user.email, Validators.required],
      first_name: [this.user.first_name, Validators.required],
      last_name: [this.user.last_name, Validators.required],
      profile: this.profileFormGroup,
    });

  }

  onSubmit() {
    this.submitted = true;
    this.loading = true;

    // stop here if form is invalid
    if (this.form.invalid) {
      // console.log('form invalid');
      this.loading = false;
      return;
    }

    console.log('Updating Profile...', this.form.value);

    this.backendService.put('/api/v1/user/', this.form.value)
    .subscribe({
      next: (updatedUser) => {
        this.userUpdated.emit(updatedUser);  // send back updated user information to ProfileComponent
        this.alertService.success('Profile updated!', { autoClose: true });
        this.loading = false;
        this.submitted = false;
        this.activeModal.close();
      },
      error: (response) => {
        console.log(response);
        this.alertService.error('Register New User Failed! Check your fields and try again.', { id: 'alert-modal', autoClose: true });
        this.loading = false;
      }
    });

  }

}

