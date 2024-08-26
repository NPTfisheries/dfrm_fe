import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BackendService } from 'src/_services/backend.service';
import { getRouteType, getRouteSlug } from 'src/_utilities/route-utils';
import { buildImageUrl } from 'src/_utilities/buildImageUrl';
import { ProjectService } from 'src/_services/project.service';


@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html'
})
export class DetailPageComponent implements OnInit {

  data: any | null = null;
  bannerImage!: string | null;
  routeType: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private backendService: BackendService,
    private projectService: ProjectService,
  ) { }

  ngOnInit(): void {
    this.getDetail();
    window.scrollTo(0, 0);
  }

  getDetail() {
    this.routeType = getRouteType(this.route);
    const slug = getRouteSlug(this.route);

    if(this.routeType == 'project') {
      this.projectService.getProjectBySlug(slug).subscribe(project => {
        this.data = project;
        // this.bannerImage = buildImageUrl(project?.img_banner?.image);
      });
    }

    this.backendService.getDetail(this.routeType, slug).subscribe(detail => {
      this.data = detail;
      this.bannerImage = buildImageUrl(detail.img_banner.image);
    });
  }

}

