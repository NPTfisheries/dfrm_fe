import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BackendService } from 'src/_services/backend.service';
import { getRouteType, getRouteSlug } from 'src/_utilities/route-utils';
import { buildImageUrl } from 'src/_utilities/buildImageUrl';

@Component({
  selector: 'app-facility-detail',
  templateUrl: './facility-detail.component.html'
})
export class FacilityDetailComponent implements OnInit {
  
  data: any | null = null;
  bannerImage!: string | null;
  routeType: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private backendService: BackendService,
  ) { }

  ngOnInit(): void {
    this.getDetail();
    window.scrollTo(0, 0);
  }

  getDetail() {
    this.routeType = getRouteType(this.route);
    const slug = getRouteSlug(this.route);
    this.backendService.getDetail(this.routeType, slug).subscribe(detail => {
      this.data = detail;
      this.bannerImage = buildImageUrl(detail.properties.img_banner.image);
    });
  }

}
