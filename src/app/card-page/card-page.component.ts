import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BackendService } from 'src/_services/backend.service';

@Component({
  selector: 'app-card-page',
  templateUrl: './card-page.component.html',
  styleUrls: ['./card-page.component.css']
})
export class CardPageComponent implements OnInit {

  list: any | undefined;

  constructor(
    private route: ActivatedRoute,
    private backendService: BackendService,
  ) { }

  ngOnInit(): void {
    this.getList();    
  }

  getList() {
    this.route.url.subscribe(params => {
      this.backendService.get(`/api/v1/${params[0].path}/`).subscribe(response => {
        console.log(response);
        this.list = response;
      });
    });
  }

}
