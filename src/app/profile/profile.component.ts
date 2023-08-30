import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';

import { BackendService } from 'src/_services/backend.service';
import { User } from 'src/_models/user';

import { ProfileUpdateComponent } from '../forms/profile-update/profile-update.component';
import { getRouteType, getRouteSlug } from 'src/_utilities/route-utils';
import { formatPhone } from 'src/_utilities/formatPhone';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  formatPhone = formatPhone;
  user: User | undefined;
  imageUrl!: string | undefined;
  routeType!: string;

  constructor(
    private bs: BackendService,
    private route: ActivatedRoute,
    public modalService: NgbModal,
  ) { }

  ngOnInit() {
    this.getUserData();
  }

  getUserData() {
    // profile component is for user info and also user profile.
    this.routeType = getRouteType(this.route);

    if (this.routeType === 'users') {
      const slug = getRouteSlug(this.route);  // actually 'id'
      this.bs.getDetail(this.routeType, slug).subscribe(user => {
        this.user = user;
        this.getImage(user?.profile?.photo);
      });
    } else {
      this.bs.getCurrentUser().subscribe(currentUser => {
        this.user = currentUser;
        this.getImage(currentUser?.profile?.photo);
      });
    }
  }

  updateProfile() {
    const modalRef = this.modalService.open(ProfileUpdateComponent, { size: 'xl' });
    modalRef.componentInstance.user = this.user; // pass user to modal

    modalRef.componentInstance.userUpdated.subscribe((updatedUser: any) => {
      this.user = updatedUser;
      this.getImage(updatedUser.profile.photo);
    });
  }

  getImage(path: string | undefined) {
    this.imageUrl = path?.replace('http://localhost:4200', 'http://localhost:8000');
  }

}
