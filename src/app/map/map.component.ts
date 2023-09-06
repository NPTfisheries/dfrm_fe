import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  @ViewChild('map') private mapContainer!: ElementRef;
  private map!: L.Map;

  ngOnInit(): void {
    this.initMap();
  }

  private initMap(): void {
    // Set up the map
    this.map = L.map('map').setView([44.862533, -116.087802], 13);

    // Add a tile layer (you can use any tile provider)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 10
    }).addTo(this.map);

    // Add a marker (optional)
  //   L.marker([51.5, -0.09]).addTo(this.map)
  //     .bindPopup('Hello, Leaflet!')
  //     .openPopup();
  }
}