import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { AuthService } from 'src/_services/auth.service';
import { User } from 'src/_models/user';

import { LoginComponent } from '../login/login.component';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  tabs = ['Home',  'Divisions', 'Profile']

  user?: User | null = null; 
  token: string | null = null;

  constructor(
    public authService: AuthService,
    private modalService: NgbModal,
  ) {  }

  ngOnInit() {
    this.authService.user$.subscribe(user => {
      this.user = user;
    });
    this.authService.token$.subscribe(token => {
      this.token = token;
    });
  }

  openLoginModal() {
    this.modalService.open(LoginComponent);
  }
}
