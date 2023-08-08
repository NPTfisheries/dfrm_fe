import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ProfileService } from 'src/_services/profile.service';
import { Profile } from 'src/_models/profile';

import { formatLabel } from 'src/_helpers/formatLabel';

interface Fields {
  [key: string]: string;
}

@Component({
  selector: 'app-profile-update',
  templateUrl: './profile-update.component.html',
  styleUrls: ['./profile-update.component.css']
})
export class ProfileUpdateComponent {
  form!: FormGroup;
  formatLabel = formatLabel
  loading = false;
  submitted = false;
  profile: Profile | null = null;

  fields: Fields = {
    user: 'text',
    work_phone: 'text',
    mobile_phone: 'text',
    city: 'text',
    state: 'text',
    bio: 'text',
    photo: 'text',
  };

  get fieldsKeys(): string[] {
    return Object.keys(this.fields);
  }

  trackByFn(index: number, item: string): string {
    return item;
  }

  constructor(
    private formBuilder: FormBuilder,
    private activeModal: NgbActiveModal,
    private profileService: ProfileService,
  ) { }

  get f() { return this.form.controls; }

  ngOnInit() {
    this.form = this.formBuilder.group({});

    // Adding form controls dynamically based on fields

    for (const key of this.fieldsKeys) {
      const validators = this.fields[key] === 'text' ? [Validators.required] : [];
      this.form.addControl(key, this.formBuilder.control('', validators));
    }
    
    this.profileService.profile$.subscribe(profile => {
      this.profile = profile;
    });
  }

  onSubmit() {
    console.log('clicked update profile');
    // this.profileService.updateProfile();
    this.activeModal.close();
  }

}
