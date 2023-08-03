import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/_services/auth.service';
import { User } from 'src/_models/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user: any | null = null;
  token: any | null = null;

  constructor(
    private authService: AuthService,
  ) {  }

  ngOnInit() {  
    this.authService.user$.subscribe((user) => {
      this.user = user;
      this.token = user?.token;
    });
  }

  showUser() {
    console.log(this.user);
    console.log(typeof(this.user));
    console.log(this.user.id);
    console.log(this.user.username);
    console.log('Token', this.token)
  }


}
