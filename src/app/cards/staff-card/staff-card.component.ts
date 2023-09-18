import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-staff-card',
  templateUrl: './staff-card.component.html',
  styleUrls: ['./staff-card.component.css']
})
export class StaffCardComponent {

  @Input() data: any | undefined;
  imageUrl!: any | null;

  constructor(
    private router: Router,
  ) { }

  navigateToUserProfile() {
    console.log('Staff Card Clicked!');
    this.router.navigateByUrl('users/' + this.data.id);
  };

  ngOnChanges() {
    if (this.data) {
      // this.getProfilePhoto(this.data);
      this.imageUrl=`http://localhost:8000${this.data.profile.photo}`;
    }
  }
  
  // getProfilePhoto(user: any) {
  //   // for data passed from a nested employee, you only get the end path: "/media/images/profile_default.JPG"
  //   // this.imageUrl = 'http://localhost:8000' + this.data.profile.photo; 
  //   this.imageUrl = 'http://localhost:8000' + user.profile.photo; 
  // }
}
