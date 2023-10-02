import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { buildImageUrl } from 'src/_utilities/buildImageUrl';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() routeType: string = '';
  @Input() data: any | undefined;
  imageUrl!: string | null;

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getImage();
  }

  navigateToDetail(slug: string) {
    this.router.navigateByUrl(this.routeType + '/' + slug);
  };

  getImage() {
    // this.imageUrl = 'http://localhost:8000' + this.data.img_card.image;
    this.imageUrl = buildImageUrl(this.data.img_card.image);
  }

}
