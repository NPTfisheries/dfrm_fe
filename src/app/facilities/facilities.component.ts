import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FacilityService } from 'src/_services/facility.service';

@Component({
  selector: 'app-facilities',
  templateUrl: './facilities.component.html'
})
export class FacilitiesComponent implements OnInit {


  list: any | undefined;

  constructor(
    private route: ActivatedRoute,
    private facilityService: FacilityService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getList();
  }

  getList() {
    this.facilityService.getFacilities().subscribe(facilities => {
      var active_facilities: any = [];
      facilities.filter((facility: any) => {
        if (facility.properties.is_active) {
          active_facilities.push(facility);
        }
      });
      this.list = active_facilities;
    });
  }

  navToFacility(slug: string) {
    // console.log('goToFacility!', slug);
    this.router.navigate([`facility/${slug}`]);
  }

}
