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

  user?: any | null = null; 

  constructor(
    private authService: AuthService
  ) {  
    this.user = this.authService.user$.getValue();
  }

  ngOnInit() {
    this.authService.user$.subscribe(user => {
      this.user = user;
    });

  }

  logout(){
    this.authService.logout();
   }

}
