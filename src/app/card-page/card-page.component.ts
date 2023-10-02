import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BackendService } from 'src/_services/backend.service';

import { getRouteType } from 'src/_utilities/route-utils';

@Component({
  selector: 'app-card-page',
  templateUrl: './card-page.component.html',
  styleUrls: ['./card-page.component.css']
})
export class CardPageComponent implements OnInit {

  department: any | undefined;
  list: any | undefined;
  routeType!: string | undefined;
  bannerImage: any | undefined = "./assets/images/Clearwater_River_Home_Page.jpg";

  constructor(
    private route: ActivatedRoute,
    private backendService: BackendService,
  ) { }

  ngOnInit(): void {
    this.getList();
  }

  getList() {
    // card pages have an extra s (i.e., department[s]) that must be removed to get proper url
    this.routeType = getRouteType(this.route).slice(0, -1);

    if (this.routeType == 'division') {
      this.backendService.get('/api/v1/department/')
        .subscribe(department => {
          this.department = department[0];
        });
    }

    this.backendService.getList(this.routeType).subscribe(response => {
      this.list = response;
    });

  }

}
