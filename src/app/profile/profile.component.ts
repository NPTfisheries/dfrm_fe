import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { User } from 'src/_models/user';
import { AuthService } from 'src/_services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user$: Observable<User | null>;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
    this.user$ = authService.user$;
  }

  ngOnInit() {
  }

  click1() {
    console.log('Profile User: ', this.user$);
    // console.log('Profile token: ', this.user$);
  }
}
