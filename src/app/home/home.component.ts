import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/_services/user.service';

import { User } from 'src/_models/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user?: User | null;
  loggedIn: boolean = false;
  info?: string | null;


  constructor(
    private userService: UserService
  ) {
  }

  ngOnInit() {
    // Subscribe to the user observable
    this.userService.user$.subscribe(user => {
      this.user = user;
    });
    this.userService.user$.subscribe(user => {
      this.info = JSON.stringify(user);
    })
  }


   clickFunc(){
    console.log('User$:');
    console.log(this.user);
   }   

}
