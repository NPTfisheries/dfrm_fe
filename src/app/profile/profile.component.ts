import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';

import { BackendService } from 'src/_services/backend.service';
import { User } from 'src/_models/user';

import { ProfileUpdateComponent } from '../forms/profile-update/profile-update.component';
import { getRouteType, getRouteSlug } from 'src/_utilities/route-utils';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User | undefined;
  imageUrl!: string | null;
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
      });
    } else {
      this.bs.getCurrentUser().subscribe(currentUser => {
        this.user = currentUser;
      });
    }
  }

  updateProfile() {
    const modalRef = this.modalService.open(ProfileUpdateComponent, { size: 'xl' });
    modalRef.componentInstance.user = this.user; // pass user to modal

    modalRef.componentInstance.userUpdated.subscribe((updatedUser: any) => {
      this.user = updatedUser;
    });
  }

  getImage(path: string) {
    this.imageUrl = path.replace('http://localhost:4200', 'http://localhost:8000');
  }

}
