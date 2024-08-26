import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { getRouteSlug } from 'src/_utilities/route-utils';
import { buildImageUrl } from 'src/_utilities/buildImageUrl';
import { DivisionService } from 'src/_services/division.service';

@Component({
  selector: 'app-division-detail',
  templateUrl: './division-detail.component.html'
})
export class DivisionDetailComponent implements OnInit {

  division: any | null = null;
  bannerImage!: string | null;
  routeType: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private divisionService: DivisionService,
  ) { }

  ngOnInit(): void {
    this.getDetail();
    window.scrollTo(0, 0);
  }

  getDetail() {
    const slug = getRouteSlug(this.route);
    this.divisionService.getDivisionDetail(slug).subscribe((division:any) => {
      this.division = division;
      this.bannerImage = buildImageUrl(division?.img_banner?.image);
    })
  }

}
