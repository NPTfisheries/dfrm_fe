import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BackendService } from 'src/_services/backend.service';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.css']
})
export class ListPageComponent implements OnInit {

  routeType: string | undefined;
  list: any | undefined;

  constructor (
    private route: ActivatedRoute,
    private backendService: BackendService,
  ) { }
  
  
  ngOnInit(): void {
    this.route.url.subscribe(urlSegments => {
      if (urlSegments.length > 0) {
        this.routeType =  urlSegments[0].path;
      }
      
      this.backendService.get('/api/v1/'+ this.routeType + '/').subscribe(list => {
        this.list = list;
      });


    });
  }
}
