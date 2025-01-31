import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { AuthService } from 'src/_services/auth.service';
import { AlertService } from 'src/_services/alert.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private alertService: AlertService,
    private activeModal: NgbActiveModal,
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: ['', [Validators.required, Validators.pattern(/^[\w-]+(\.[\w-]+)*@nezperce\.org$/)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(255)]]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true; // enables validation messages

    this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;

    this.authService.login(this.f['username'].value, this.f['password'].value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.activeModal.close();
        },
        error: response => {
          console.log('Error response: ', response);
          this.alertService.error(response.error.detail, { id: 'login-alert' });
          this.loading = false;
        }
      });
  }

    @HostListener('window:popstate', ['$event'])
    onPopState(event: PopStateEvent) {
      this.activeModal.close();
    }

}
