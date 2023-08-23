import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { BackendService } from 'src/_services/backend.service';
import { User } from 'src/_models/user';

import { ProfileUpdateComponent } from '../forms/profile-update/profile-update.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User | undefined;
  imageUrl!: string | null;

  constructor(
    private bs: BackendService,
    public modalService: NgbModal,
  ) {  }

  ngOnInit() {
    this.bs.getCurrentUser().subscribe((user: any) => {
      this.user = user;
      this.getImage(user.profile.photo);
    });
  }

  updateProfile() {
    const modalRef = this.modalService.open(ProfileUpdateComponent, { size: 'xl'});
    modalRef.componentInstance.user = this.user; // pass user to modal

    modalRef.componentInstance.userUpdated.subscribe((updatedUser: any) => {
      this.user = updatedUser;
    });
  }

  getImage(path: string) {
    this.imageUrl = path.replace('http://localhost:4200', 'http://localhost:8000' );  
  }

}
