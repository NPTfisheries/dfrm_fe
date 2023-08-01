import { Component, OnInit } from '@angular/core';

import { UserService } from 'src/_services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  title = 'dfrm_fe';
  tabs = ['Home',]
  loggedIn: boolean = false;


  constructor(
    private userService: UserService
  ) {  }

  ngOnInit() {
    // Subscribe to the user observable
    this.userService.loggedIn$.subscribe(loggedIn => {
      this.loggedIn = loggedIn;
    });
  }

  logout(){
    console.log('LOGOUT CLICKED');
    this.userService.logout();
   }

}
