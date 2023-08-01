import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from 'src/_services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    // private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true; // not sure of value here.

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;

    // we pass credentials to the userservice and it does the work.
    this.authService.login(this.f['username'].value, this.f['password'].value)
      // subscribe actually executes the function, and is necessary.
      .subscribe( 
        // how do we react if success (i.e., user returned)
        (user) => {
          this.loading = false;
          this.router.navigate(['home'])
        },
        // ... or error?
        (error) => {
          this.loading = false;
          alert('Try again.')  // improve the errors.
        }

      )

  }

}
