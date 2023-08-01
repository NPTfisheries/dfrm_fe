import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/_services/user.service';

import { User } from 'src/_models/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentUser?: User | null;
  loggedIn: boolean = false;


  constructor(
    private userService: UserService
  ) {  }

  ngOnInit() {
    // Subscribe to observables
    this.userService.user.subscribe(user => {
      this.currentUser = user;
    });
    this.userService.loggedIn$.subscribe(loggedIn => {
      this.loggedIn = loggedIn;
    });
  }


   clickFunc(){
    console.log('currentUser:');
    console.log(this.currentUser);
   }

   clickFunc2(){
    console.log('loggedIn$:');
    console.log(this.loggedIn);
   }
   

}
