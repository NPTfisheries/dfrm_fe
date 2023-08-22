import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-card',
  templateUrl: './employee-card.component.html',
  styleUrls: ['./employee-card.component.css']
})
export class EmployeeCardComponent {
  @Input() data: any | undefined;
  imageUrl!: string | null;

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getImage();
  }

  getImage() {
    this.imageUrl = 'http://localhost:8000' + this.data.profile.photo;
  }
}
