import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/_services/auth.service';
import { User } from 'src/_models/user';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  tabs = ['Home',]

  user?: User | null = null; 
  token: string | null = null;

  constructor(
    public authService: AuthService
  ) {  }

  ngOnInit() {
    this.authService.user$.subscribe(user => {
      this.user = user;
    });
    this.authService.token$.subscribe(token => {
      this.token = token;
    });
  }

}
