import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

import { AuthService } from 'src/_services/auth.service';
import { LoginComponent } from '../forms/login/login.component';
import { PasswordUpdateComponent } from '../forms/password-update/password-update.component';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  username?: string | null = null; 
  isLoggedIn: boolean | null = false;
  admin:boolean = false;

  constructor(
    public authService: AuthService,
    private modalService: NgbModal,
  ) {  }

  ngOnInit() {
    this.authService.username$.subscribe(username => {
      this.username = username;

      if(username && ['Tyler Stright', 'Ryan Kinzer'].includes(username)) {
        this.admin = true;
      }
    });

    this.authService.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });
  }

  openLoginModal() {
    this.modalService.open(LoginComponent, this.getModalOptions());
  }

  updatePassword() {     
    const modalRef = this.modalService.open(PasswordUpdateComponent, this.getModalOptions());

    modalRef.result.then((result) => {
      console.log(result);
      if (result === 'success') {
        
      }
    }).catch((reason) => { }); // prevents error on exiting modal by clicking outside.
  }

  getModalOptions(): NgbModalOptions {
    return { //size: 'sm', //sm, lg, xl  
    centered: true, };
  }

}
