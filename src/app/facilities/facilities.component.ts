import { Component, OnInit } from '@angular/core';
import { FacilityService } from 'src/_services/facility.service';

@Component({
  selector: 'app-facilities',
  templateUrl: './facilities.component.html'
})
export class FacilitiesComponent implements OnInit {

  list: any | undefined;

  constructor(
    private facilityService: FacilityService,
  ) { }

  ngOnInit(): void {
    this.getList();
  }

  getList() {
    this.facilityService.getFacilities().subscribe(facilities => {
      var active_facilities: any = [];
      facilities.filter((facility: any) => {
        if (facility.display) {
          active_facilities.push(facility);
        }
      });
      this.list = active_facilities;
    });
  }

}
