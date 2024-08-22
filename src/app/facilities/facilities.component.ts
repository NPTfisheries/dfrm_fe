import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from 'src/_services/backend.service';

@Component({
  selector: 'app-facilities',
  templateUrl: './facilities.component.html'
})
export class FacilitiesComponent implements OnInit {


  list: any | undefined;
  // routeType!: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private backendService: BackendService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.getList();
  }
  
  getList() {
    // this.routeType = 'facility';
    this.backendService.getList('facility').subscribe((response: any) => {
      // console.log('Facilities:', response);
      var active_facilities:any = []

      response.features.filter((facility:any) => {
        // console.log(facility.properties.is_active);
        if(facility.properties.is_active) {
          active_facilities.push(facility);
        }
      this.list = active_facilities;
      });

    })
  }

  navToFacility(slug: string) {
    console.log('goToFacility!', slug);
    this.router.navigate([`facility/${slug}`]);
  }

}
