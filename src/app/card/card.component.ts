import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {

  @Input() routeType: string = '';
  @Input() data: any | undefined;

  constructor(
    private router: Router,
  ) { }

  navigateToDetail(slug: string) {
    this.router.navigateByUrl(this.routeType + '/' + slug);
  };

}
