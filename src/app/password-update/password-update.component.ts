import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';


import { BackendService } from 'src/_services/backend.service';
import { AuthService } from 'src/_services/auth.service';
import { AlertService } from 'src/_services/alert.service';

@Component({
  selector: 'app-password-update',
  templateUrl: './password-update.component.html',
  styleUrls: ['./password-update.component.css']
})
export class PasswordUpdateComponent {
  form!: FormGroup;
  loading = false;
  submitted = false;
  user_id: number | null = null;

  constructor(
    private authService: AuthService,
    private backendService: BackendService,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private activeModal: NgbActiveModal,
  ) { }

  get f() { return this.form.controls; }

  ngOnInit() {
    this.user_id = this.authService.userId;

    this.form = this.formBuilder.group({
      old_password: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(255)]],
      password2: ['', Validators.required]
    });

    // add custom password match validation
    this.form.get('password2')?.setValidators([Validators.required, this.passwordMatchValidator]);
  }

  onSubmit() {
    console.log('updat pw fird', this.form.value);
    this.backendService.put(`/api/v1/change_password/${this.user_id}/`, this.form.value).subscribe(response => {
      this.alertService.success('Password updated!')
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
