import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BackendService } from 'src/_services/backend.service';


@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.css']
})
export class DetailPageComponent implements OnInit {

  detail: any | null = null;

  constructor(
    private route: ActivatedRoute,
    private backendService: BackendService,
  ) { }

  ngOnInit(): void {
    this.getDetail();
  }

  getDetail() {
    this.route.url.subscribe(params => {
      console.log('params', params);
      const url = `/api/v1/${params[0].path}/${params[1].path}/`;
      console.log('url', url);
      this.backendService.get(url).subscribe(response => {
        console.log(response);
        this.detail = response;
      });

    });
  }

}

