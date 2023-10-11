import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BackendService } from 'src/_services/backend.service';
import { getRouteSlug, getRouteType } from 'src/_utilities/route-utils';
import { buildImageUrl } from 'src/_utilities/buildImageUrl';

@Component({
  selector: 'app-division-detail',
  templateUrl: './division-detail.component.html'
})
export class DivisionDetailComponent implements OnInit{

  division: any | null = null;
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
      this.division = detail;
      this.bannerImage = buildImageUrl(detail.img_banner.image);
    });
  }

}
