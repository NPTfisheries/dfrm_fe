import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BackendService } from 'src/_services/backend.service';
import { getRouteType, getRouteSlug } from 'src/_utilities/route-utils';


@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.css']
})
export class DetailPageComponent implements OnInit {

  data: any | null = null;
  imageUrl!: string | null;

  constructor(
    private route: ActivatedRoute,
    private backendService: BackendService,
  ) { }

  ngOnInit(): void {
    this.getDetail();
  }

  getDetail() {
    const routeType = getRouteType(this.route);
    // console.log('routeType:', routeType);
    const slug = getRouteSlug(this.route);
    // console.log('slug:', slug);
    
    this.backendService.getDetail(routeType, slug).subscribe(detail => {
      this.data = detail;
      this.getImage(detail.img_banner.image);
    });
  }

  getImage(url:string) {
    return this.imageUrl = 'http://localhost:8000'+url;
  }

}

