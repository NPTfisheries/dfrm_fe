import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { first } from 'rxjs';

import { UserService } from 'src/_services/user.service';
import { AlertService } from 'src/_services/alert.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private alertService: AlertService,
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(/^[\w-]+(\.[\w-]+)*@nezperce\.org$/)]],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(255)]],
      password2: ['', Validators.required]
    });

    // add custom password match validation
    this.form.get('password2')?.setValidators([Validators.required, this.passwordMatchValidator]);
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;
    this.loading = true;

    // stop here if form is invalid
    if (this.form.invalid) {
      this.loading = false;
      return;
    }

    this.userService.register(this.form.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.alertService.success('Registration successful!');
          // reset the form to allow for another round.
          this.form.reset();
          this.loading = false;
          this.submitted = false;
        },
        error: response => {
          // console.log(response);
          this.alertService.error('Register New User Failed! Check your fields and try again.');
          this.loading = false;
        }
      })
  }

  // Custom validator to check if passwords match
  passwordMatchValidator(control: AbstractControl): { [key: string]: any } | null {
    const password = control.root.get('password')?.value;
    const password2 = control.value;
    return password === password2 ? null : { passwordMismatch: true };
  }

}
