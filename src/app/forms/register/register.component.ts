import { Component, EventEmitter, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Subscription } from 'rxjs';

import { AuthService } from 'src/_services/auth.service';
import { AlertService } from 'src/_services/alert.service';
import { BackendService } from 'src/_services/backend.service';

import { ListPageComponent } from 'src/app/list-page/list-page.component';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Input() context!: ListPageComponent

  form!: FormGroup;
  loading = false;
  submitted = false;
  permissionGroup!: string;
  private permissionGroupSubscription: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private alertService: AlertService,
    private activeModal: NgbActiveModal,
    private backendService: BackendService,
  ) {
    this.permissionGroupSubscription = this.authService.permissionGroup$.subscribe(group => {
      this.permissionGroup = group;
    });
  }

  ngOnInit() {

    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(/^[\w-]+(\.[\w-]+)*@nezperce\.org$/)]],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      role: ['', Validators.required],
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

    this.authService.register(this.form.value).subscribe({
      next: () => {
        this.backendService.getList('users').subscribe(updatedList => {
          this.context.data = updatedList;
        });
        this.activeModal.close();
      },
      error: response => {
        console.log(response);
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
