import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

import { BackendService } from 'src/_services/backend.service';
import { AlertService } from 'src/_services/alert.service';

@Component({
  selector: 'app-password-update',
  templateUrl: './password-update.component.html'
})
export class PasswordUpdateComponent {
  form!: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private backendService: BackendService,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private activeModal: NgbActiveModal,
  ) { }

  get f() { return this.form.controls; }

  ngOnInit() {
    this.form = this.formBuilder.group({
      old_password: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(255)]],
      password2: ['', Validators.required]
    });

    // add custom password match validation
    this.form.get('password2')?.setValidators([Validators.required, this.passwordMatchValidator]);
  }

  onSubmit() {
    // console.log('updating password...', this.form.value);
    this.backendService.updatePassword(this.form.value).subscribe(response => {
      this.alertService.success('Password updated!', { autoClose: true });
      this.activeModal.close('success');
    });
  }

    // Custom validator to check if passwords match
    passwordMatchValidator(control: AbstractControl): { [key: string]: any } | null {
      const password = control.root.get('password')?.value;
      const password2 = control.value;
      return password === password2 ? null : { passwordMismatch: true };
    }

}
