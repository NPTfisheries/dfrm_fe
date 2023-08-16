import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BackendService } from 'src/_services/backend.service';

import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-card-page',
  templateUrl: './card-page.component.html',
  styleUrls: ['./card-page.component.css']
})
export class CardPageComponent implements OnInit {

  list: any | undefined;
  routeType: string | undefined;
  bannerImage: any | undefined = '';

  constructor(
    private route: ActivatedRoute,
    private backendService: BackendService,
  ) { }

  ngOnInit(): void {
    this.getList();
    this.getImage();
  }

  getList() {
    this.route.url.subscribe(params => {
      this.routeType = params[0].path.slice(0, -1);
      this.backendService.get(`/api/v1/${this.routeType}/`).subscribe(response => {
        this.list = response;
      });
    });
  }

  //   interface ImageResponse {
  //     id: number;
  //     slug: string;
  //     name: string;
  //     description: string;
  //     photographer: string;
  //     source: string;
  //     image: string; // Add the 'image' property here
  // }

  getImage() {
    this.backendService.get('/api/v1/image/saturn/').subscribe((response: any) => {
      this.bannerImage = response.image;
    });
  }

}
