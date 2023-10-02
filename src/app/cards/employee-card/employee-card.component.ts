import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { buildImageUrl } from 'src/_utilities/buildImageUrl';

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

  navigateToUserProfile() {
    // console.log('Employee Card Clicked!');
    this.router.navigateByUrl('users/' + this.data.id);
  };

  ngOnChanges() {
    if (this.data) {
      this.imageUrl = buildImageUrl(this.data.profile.photo);
    }
  }
  
}
