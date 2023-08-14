import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

import { BackendService } from 'src/_services/backend.service';
import { User } from 'src/_models/user';
import { Profile } from 'src/_models/profile';

import { ProfileUpdateComponent } from '../profile-update/profile-update.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: any | undefined;

  constructor(
    private backendService: BackendService,
    public modalService: NgbModal,
    private router: Router,
  ) {  }

  ngOnInit() {
    this.backendService.get('./api/v1/user').subscribe(user => {
      this.user = user;
    });
    
  }

  updateProfile() {
    const modalRef = this.modalService.open(ProfileUpdateComponent, { size: 'xl'});
    modalRef.componentInstance.user = this.user; // pass user to modal

    modalRef.componentInstance.userUpdated.subscribe((updatedUser: any) => {
      this.user = updatedUser;
    });
  }

}
