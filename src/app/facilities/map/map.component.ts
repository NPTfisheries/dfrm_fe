import { Component, AfterViewInit, Input, ElementRef, ViewChild, OnChanges, SimpleChanges } from '@angular/core';

import * as L from 'leaflet';

import { formatPhone } from 'src/_utilities/formatPhone';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit, OnChanges {
  
  // @ViewChild('map') private mapContainer!: ElementRef;

  @Input() facilities!: any;

  private map!: L.Map;

  ngAfterViewInit(): void {
    this.initMap();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['facilities'] && !changes['facilities'].firstChange) {
      if(this.facilities) {
        this.addMarkers();
      }
    }
  }

  private initMap(): void {
    this.map = L.map('map').setView([45.25, -116.087802], 8);

    L.tileLayer('https://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Tiles courtesy of the <a href="https://usgs.gov/">U.S. Geological Survey</a>',
      maxZoom: 20,
      minZoom: 7
    }).addTo(this.map);

    L.control.scale().addTo(this.map);

    this.addMarkers();
  }

  addMarkers() {
        // // Add a marker (optional)
    //   L.marker([51.5, -116.09]).addTo(this.map)
    //     .bindPopup('Hello, Leaflet!')
    //     .openPopup();
    for(let f of this.facilities) {
      L.marker([f.geometry.coordinates[1], f.geometry.coordinates[0]]).addTo(this.map)
        .bindPopup(`<h3>${f.properties.name}</h3>
                    <hr>
                    <h5>${f.properties.street_address}</h5>
                    <h5>${f.properties.city}, ${f.properties.state} ${f.properties.zipcode}</h5>
                    <h5>${formatPhone(f.properties.phone_number)}</h5>
                    `)
    }
  }
}