import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';

import { BackendService } from 'src/_services/backend.service';
import { User } from 'src/_models/user';

import { getRouteType, getRouteSlug } from 'src/_utilities/route-utils';
import { formatPhone } from 'src/_utilities/formatPhone';
import { FormContainerComponent } from '../forms/form-container/form-container.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  formatPhone = formatPhone;
  data: User | undefined; // user
  imageUrl!: string | undefined;
  routeType!: string;

  constructor(
    private bs: BackendService,
    private route: ActivatedRoute,
    public modalService: NgbModal,
  ) { }

  ngOnInit() {
    this.getUserData();
    window.scrollTo(0, 0);
  }

  getUserData() {
    // profile component is for user info and also user profile.
    this.routeType = getRouteType(this.route);

    if (this.routeType === 'users') {
      const slug = getRouteSlug(this.route);  // actually 'id'
      this.bs.getDetail(this.routeType, slug).subscribe(user => {
        this.data = user;
        this.getImage(user?.profile?.photo);
      });
    } else {
      this.bs.getCurrentUser().subscribe(currentUser => {
        this.data = currentUser;
        this.getImage(currentUser?.profile?.photo);
      });
    }
  }

  updateProfile() {
    const modalRef = this.modalService.open(FormContainerComponent, { size: 'xl' });
    modalRef.componentInstance.context = this;
    modalRef.componentInstance.routeType = 'profile';
    modalRef.componentInstance.data = this.data?.profile; // pass profile info to modal
  }

  updateProfilePhoto() {

  }

  getImage(path: string | undefined) {
    this.imageUrl = path?.replace('http://localhost:4200', 'http://localhost:8000');
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

      this.bs.updateProfilePhoto(formData).subscribe(response => {
        console.log(response);
        this.getImage(response.photo);
      });
    }
  }

}
