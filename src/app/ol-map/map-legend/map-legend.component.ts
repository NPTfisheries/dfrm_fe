import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-map-legend',
  templateUrl: './map-legend.component.html',
  styleUrls: ['./map-legend.component.css']
})
export class MapLegendComponent {
  @Input() facilityTypeColors: { [key: string]: string } = {};

  ngOnInit(): void {
    // console.log(this.facilityTypeColors);
  }

}