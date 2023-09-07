import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';

import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
  @ViewChild('map') private mapContainer!: ElementRef;
  private map!: L.Map;

  ngAfterViewInit(): void {
    this.initMap();
  }


  private initMap(): void {
    this.map = L.map('map').setView([44.862533, -116.087802], 10);

    L.tileLayer('https://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Tiles courtesy of the <a href="https://usgs.gov/">U.S. Geological Survey</a>',
      maxZoom: 20,
      minZoom: 3
    }).addTo(this.map);


    L.control.scale().addTo(this.map);

    // Add a marker (optional)
    //   L.marker([51.5, -0.09]).addTo(this.map)
    //     .bindPopup('Hello, Leaflet!')
    //     .openPopup();
  }
}