import { Component, AfterViewInit, Input, ElementRef, ViewChild, OnChanges, SimpleChanges } from '@angular/core';

import * as L from 'leaflet';

import { formatPhone } from 'src/_utilities/formatPhone';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit, OnChanges {
  
  @Input() facilities!: any;

  private map!: L.Map;

  customIcon = L.divIcon({
    className: 'custom-icon', // Define a CSS class for styling the icon
    html: '<i class="fa fa-location-dot fa-2xl" style="color:#a712de" ></i>', // Use the Font Awesome icon class
    iconSize: [10, 10], // Set the size of your custom icon (e.g., width: 32px, height: 32px)
    iconAnchor: [10, 20], // Set the icon anchor point [:top left] (usually half of iconSize for centering)
    popupAnchor: [0, 0] // Set the popup anchor point relative to the icon (adjust as needed)
  });

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
    for(let f of this.facilities) {
      L.marker([f.geometry.coordinates[1], f.geometry.coordinates[0]],
        { icon: this.customIcon}).addTo(this.map)
        .bindPopup(`<h3>${f.properties.name}</h3>
                    <hr>
                    <h5>${f.properties.street_address}</h5>
                    <h5>${f.properties.city}, ${f.properties.state} ${f.properties.zipcode}</h5>
                    <h5>${formatPhone(f.properties.phone_number)}</h5>
                    `)
    }
  }

}