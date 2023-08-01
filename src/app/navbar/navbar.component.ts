import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/_services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  tabs = ['Home',]
  loggedIn: boolean = false;


  constructor(
    private authService: AuthService
  ) {  }

  ngOnInit() {
    // Subscribe to the user observable
    this.authService.loggedIn$.subscribe(loggedIn => {
      this.loggedIn = loggedIn;
    });
  }

  logout(){
    this.authService.logout();
   }

}
