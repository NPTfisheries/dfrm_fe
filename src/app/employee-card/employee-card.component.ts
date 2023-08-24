import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from 'src/_services/backend.service';

@Component({
  selector: 'app-employee-card',
  templateUrl: './employee-card.component.html',
  styleUrls: ['./employee-card.component.css']
})
export class EmployeeCardComponent {

  @Input() data: any | undefined;
  imageUrl!: any | null;

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getProfilePhoto();
  }

  navigateToUserProfile() {
    console.log('Employee Card Clicked!');
    this.router.navigateByUrl('users/' + this.data.id);
  };
  
  getProfilePhoto() {
    // for data passed from a nested employee, you only get the end path: "/media/images/profile_default.JPG"
    this.imageUrl = 'http://localhost:8000' + this.data.profile.photo; 
  }

}
