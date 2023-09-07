import { Component, SimpleChanges } from '@angular/core';

import * as L from 'leaflet';

@Component({
  selector: 'app-geometry-input',
  templateUrl: './geometry-input.component.html',
  styleUrls: ['./geometry-input.component.css']
})
export class GeometryInputComponent {
  
  private map!: L.Map;

  ngAfterViewInit(): void {
    this.initMap();
  }

  ngOnChanges(changes: SimpleChanges): void {

  }


  private initMap(): void {
    this.map = L.map('map').setView([45.25, -116.087802], 8);

    L.tileLayer('https://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Tiles courtesy of the <a href="https://usgs.gov/">U.S. Geological Survey</a>',
      maxZoom: 20,
      minZoom: 7
    }).addTo(this.map);

    this.map.on('click', (e: L.LeafletMouseEvent) => {
      const lat = e.latlng.lat;
      const long = e.latlng.lng;
    })

  }
}
