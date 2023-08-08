import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { User } from 'src/_models/user';
import { AuthService } from 'src/_services/auth.service';

import { Profile } from 'src/_models/profile';
import { ProfileService } from 'src/_services/profile.service';

import { ProfileUpdateComponent } from '../profile-update/profile-update.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user$: Observable<User | null>;
  profile$: Profile | null = null;

  constructor(
    private authService: AuthService,
    private profileService: ProfileService,
    public modalService: NgbModal,
    private router: Router,
  ) {
    this.user$ = authService.user$;
    // this.profile$ = profileService.profile$;
  }

  ngOnInit() {
    this.profileService.getProfile().subscribe(profile => {
      console.log('profilecomp:', profile);
    })
  }

  updateProfile() {
    this.modalService.open(ProfileUpdateComponent, { size: 'xl'});
  }
}
