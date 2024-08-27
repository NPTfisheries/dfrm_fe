import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';

import { BackendService } from 'src/_services/backend.service';
import { User } from 'src/_models/interfaces';
import { DomSanitizer } from '@angular/platform-browser';

import { getRouteType, getRouteSlug } from 'src/_utilities/route-utils';
import { buildImageUrl } from 'src/_utilities/buildImageUrl';
import { formatPhone } from 'src/_utilities/formatPhone';
import { FormContainerComponent } from '../forms/form-container/form-container.component';
import { UserService } from 'src/_services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  String = String;

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  formatPhone = formatPhone;
  data: User | undefined; // user
  imageUrl!: string | undefined;
  routeType!: string;

  constructor(
    private bs: BackendService,
    private userService: UserService,
    private route: ActivatedRoute,
    public modalService: NgbModal,
    public sanitizer: DomSanitizer,
  ) { }

  ngOnInit() {
    this.getUserData();
    window.scrollTo(0, 0);
  }

  getUserData() {
    // profile component is for user info and also user profile.
    this.routeType = getRouteType(this.route);

    if (this.routeType === 'users') {
      const slug = getRouteSlug(this.route);  // user slug is actually 'id'
      this.userService.getUserById(slug).subscribe(user => {
        this.data = user;
        this.imageUrl = buildImageUrl(user?.profile?.photo);
      });
    } else {
      this.bs.getCurrentUser().subscribe(currentUser => {
        this.data = currentUser;
        this.imageUrl = buildImageUrl(currentUser?.profile?.photo)
      });
    }
  }

  updateProfile() {
    const modalRef = this.modalService.open(FormContainerComponent, { size: 'xl' });
    modalRef.componentInstance.context = this;
    modalRef.componentInstance.routeType = 'profile';
    modalRef.componentInstance.data = this.data?.profile; // pass profile info to modal
    modalRef.componentInstance.addOrEdit ='edit';
    
  }

  triggerFileInputClick() {
    // Use nativeElement.click() to trigger the file input click event
    this.fileInput.nativeElement.click();
  }

  handleFileInputChange(event: any) { // making this :Event is causing silly errors.
    console.log(event.target.files);
    if (event?.target?.files && event.target.files.length > 0) {
      const photo = event.target.files[0];
      console.log(photo);

      const formData = new FormData();
      formData.append('photo', photo)

      this.bs.updateProfile(formData).subscribe(response => {
        console.log(response);
        this.imageUrl = buildImageUrl(response.photo)
      });
    }
  }

}
