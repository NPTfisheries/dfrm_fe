import { Component, OnInit } from '@angular/core';

import { UserService } from 'src/_services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
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
