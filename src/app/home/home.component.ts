import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/_services/auth.service';
import { User } from 'src/_models/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  token: any | null = null;

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.authService.token$.subscribe((token) => {
      this.token = token;
    });
  }

  getTokenVal() {
    console.log(this.authService.token$.getValue());
  }

}
