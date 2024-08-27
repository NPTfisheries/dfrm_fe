import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { getRouteSlug } from 'src/_utilities/route-utils';
import { buildImageUrl } from 'src/_utilities/buildImageUrl';
import { FacilityService } from 'src/_services/facility.service';

@Component({
  selector: 'app-facility-detail',
  templateUrl: './facility-detail.component.html'
})
export class FacilityDetailComponent implements OnInit {
  
  data: any | null = null;
  bannerImage!: string | null;

  constructor(
    private route: ActivatedRoute,
    private facilityService: FacilityService,
  ) { }

  ngOnInit(): void {
    this.getDetail();
    window.scrollTo(0, 0);
  }

  getDetail() {
    const slug = getRouteSlug(this.route);

    this.facilityService.getFacilityBySlug(slug).subscribe(facility => {
      console.log('facility', facility);
      this.data = facility;
      this.bannerImage = buildImageUrl(facility?.properties?.img_banner?.image);
    });

  }

}
