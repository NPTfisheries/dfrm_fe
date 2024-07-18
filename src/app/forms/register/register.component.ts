import { Component,  OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';

import { AuthService } from 'src/_services/auth.service';
import { AlertService } from 'src/_services/alert.service';
import { BackendService } from 'src/_services/backend.service';

import { ListPageComponent } from 'src/app/list-page/list-page.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {

  @Input() context!: ListPageComponent;

  form!: FormGroup;
  loading = false;
  submitted = false;

  roles = [
    { value: '2', label: 'Manager' },
    { value: '3', label: 'Project Leader' },
    { value: '4', label: 'Professional' },
    { value: '5', label: 'Technician' },
    { value: '6', label: 'Guest' }
  ];

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private alertService: AlertService,
    private activeModal: NgbActiveModal,
    private backendService: BackendService,
  ) { }

  ngOnInit() {

    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(/^[\w-]+(\.[\w-]+)*@nezperce\.org$/)]],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      role: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(255)]],
      password2: ['', Validators.required]
    }, {
      validators: this.passwordMatchValidator
    });

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
        this.alertService.error('Register New User Failed! Check your fields and try again.', { autoClose: true });
        this.loading = false;
      }
    })
  }

  // Custom validator to check if passwords match
  passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.root.get('password')?.value;
    const password2 = group.root.get('password2')?.value;
    
    // the validation message for the password2 mismatch isn't functioning 7/18/24
    // but RK and TS are the only ones who can do this, so whatever. 
    return password === password2 ? null : { passwordMismatch: true };
  }

}
