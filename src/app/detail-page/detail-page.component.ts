import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { getRouteType, getRouteSlug } from 'src/_utilities/route-utils';
import { buildImageUrl } from 'src/_utilities/buildImageUrl';
import { ProjectService } from 'src/_services/project.service';

// Project Detail
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
    private projectService: ProjectService,
  ) { }

  ngOnInit(): void {
    this.getDetail();
    window.scrollTo(0, 0);
  }

  getDetail() {
    this.routeType = getRouteType(this.route);  // needed to pass to subproject/task details
    const slug = getRouteSlug(this.route);

    this.projectService.getProjectBySlug(slug).subscribe((project: any) => {
      this.data = project;
      this.bannerImage = buildImageUrl(project?.img_banner?.image);
    });
  }

}

