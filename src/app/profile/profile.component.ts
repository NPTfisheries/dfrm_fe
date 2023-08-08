import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { User } from 'src/_models/user';
import { AuthService } from 'src/_services/auth.service';

import { ProfileUpdateComponent } from '../profile-update/profile-update.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user$: Observable<User | null>;
  // profile$: Observable<Profile | null>;

  constructor(
    private authService: AuthService,
    public modalService: NgbModal,
    private router: Router,
  ) {
    this.user$ = authService.user$;
    // this.profile$ = profileService.profile$;
  }

  ngOnInit() {
  }

  updateProfile() {
    this.modalService.open(ProfileUpdateComponent);
  }
}
