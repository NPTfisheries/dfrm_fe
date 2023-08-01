import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/_services/auth.service';

import { UserService } from 'src/_services/user.service';

class Auth {
  token?: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  submitted = false;
  token: string|null = null

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.authService.token$.subscribe(token =>
        this.token = token);

  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {
    console.log('SUBMIT REG', this.f['email'].value, this.f['password'].value);
  }


  click1() {
    console.log('auth?', this.token)
  }

}
