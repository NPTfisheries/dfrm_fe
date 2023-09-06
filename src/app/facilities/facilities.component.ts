import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BackendService } from 'src/_services/backend.service';

@Component({
  selector: 'app-facilities',
  templateUrl: './facilities.component.html',
  styleUrls: ['./facilities.component.css']
})
export class FacilitiesComponent implements OnInit {


  list: any | undefined;
  routeType!: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private backendService: BackendService,
  ) {}

  ngOnInit(): void {
  }
  
  getList() {
    this.routeType = 'facility';
    this.backendService.getList(this.routeType).subscribe(facilities => {
      console.log('Facilities:', facilities);
    })
  }

}
