import { Component, Input, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';

import { formatPhone } from 'src/_utilities/formatPhone';

@Component({
  selector: 'app-detail-map',
  templateUrl: './detail-map.component.html',
  styleUrls: ['./detail-map.component.css']
})
export class DetailMapComponent implements AfterViewInit {

  @Input() facility: any;
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

  private initMap(): void {
    this.map = L.map('map', {scrollWheelZoom:false}).setView([this.facility.geometry.coordinates[1], this.facility.geometry.coordinates[0]], 10);

    L.tileLayer('https://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Tiles courtesy of the <a href="https://usgs.gov/">U.S. Geological Survey</a>',
      maxZoom: 20,
      minZoom: 7
    }).addTo(this.map);

    L.control.scale({ position: 'topright' }).addTo(this.map);

    this.addMarkers();
  }

  addMarkers() {
    L.geoJSON(this.facility.geometry, {
      pointToLayer: (feature, latlng) => {
        // Create a marker with the custom icon
        return L.marker(latlng, {
          icon: this.customIcon,
        });
      }
    }).addTo(this.map)
    .bindPopup(this.addressPopup(this.facility));
  }

  addressPopup(facility: any) {
    return `
    <div style="text-align:center;">
    <h3>${facility.properties.name}</h3>
    <hr>
    <h5>${facility.properties.street_address}</h5>
    <h5>${facility.properties.city}, ${facility.properties.state} ${facility.properties.zipcode}</h5>
    <h5>${formatPhone(facility.properties.phone_number)}</h5>
    </div>
    `
  }  

}
