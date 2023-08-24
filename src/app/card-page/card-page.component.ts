import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BackendService } from 'src/_services/backend.service';

import { getRouteType } from 'src/_utilities/route-utils';

// import { CardComponent } from '../card/card.component';

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
    // card pages have an extra s (i.e., department[s]) that must be removed to get proper url
    this.routeType = getRouteType(this.route).slice(0,-1);

    this.backendService.getList(this.routeType).subscribe(response => {
      this.list = response;
    });
  }

  getImage() {
    this.backendService.getImageBySlug('saturn').subscribe((response: any) => {
      // response.image is a url: "http://localhost:4200/media/images/uploaded/saturn_79MFAAl.jpg"
      const alteredUrl = response.image.replace('localhost:4200', 'localhost:8000');
      this.bannerImage = alteredUrl; 
    });
  }

}
