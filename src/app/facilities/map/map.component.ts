import { Component, AfterViewInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';

import { BackendService } from 'src/_services/backend.service';
import * as L from 'leaflet';

import { formatPhone } from 'src/_utilities/formatPhone';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit, OnChanges {

  @Output() facilitySlug = new EventEmitter<string>();
  @Input() facilities!: any;

  private map!: L.Map;

  customIcon = L.divIcon({
    className: 'custom-icon', // Define a CSS class for styling the icon
    html: '<i class="fa fa-location-dot fa-2xl" style="color:#a712de" ></i>', // Use the Font Awesome icon class
    iconSize: [10, 10], // Set the size of your custom icon (e.g., width: 32px, height: 32px)
    iconAnchor: [10, 20], // Set the icon anchor point [:top left] (usually half of iconSize for centering)
    popupAnchor: [0, 0] // Set the popup anchor point relative to the icon (adjust as needed)
  });

  constructor(
    private backendService: BackendService,
  ) { }

  ngAfterViewInit(): void {
    this.initMap();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['facilities'] && !changes['facilities'].firstChange) {
      if (this.facilities) {
        this.addMarkers();
      }
    }
  }

  private initMap(): void {
    this.map = L.map('map').setView([45.25, -116.087802], 7);

    L.tileLayer('https://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Tiles courtesy of the <a href="https://usgs.gov/">U.S. Geological Survey</a>',
      maxZoom: 20,
      minZoom: 7
    }).addTo(this.map);

    L.control.scale().addTo(this.map);

    this.addMarkers();
  }

  addMarkers() {
    L.geoJSON(this.facilities, {
      // style: (feature) => {
      //   if (feature?.properties.id >= 5) { 
      //     return { color: "blue" }; 
      //   } else {
      //     return { color: "green" }
      //   }
      // },
      pointToLayer: (feature, latlng) => {
        // Create a marker with the custom icon
        return L.marker(latlng, {
          icon: this.customIcon,
        });
      },
      onEachFeature: (feature: any, layer) => {
        const customPopupContent = this.facilityPopup(feature);
        layer.bindPopup(customPopupContent);

        layer.on('popupopen', () => {
          const button = document.getElementById('myb');
          if (button) {
            button.addEventListener('click', () => {
              console.log('button clicked', feature.id);
              this.facilitySlug.emit(feature.properties.slug);
            });
          }
        });
      }
    }).addTo(this.map);

    // var geojsonMarkerOptions = {
    //   radius: 8,
    //   fillColor: "#ff7800",
    //   color: "#000",
    //   weight: 1,
    //   opacity: 1,
    //   fillOpacity: 0.8
    // };

    // L.geoJSON(this.facilities, {
    //   pointToLayer: function(feature, latlng) {
    //     return L.circleMarker(latlng, geojsonMarkerOptions)
    //   }
    // }).addTo(this.map);
  }

  facilityPopup(facility: any) {
    return `<h3>${facility.properties.name}</h3>
    <hr>
    <h5>${facility.properties.street_address}</h5>
    <h5>${facility.properties.city}, ${facility.properties.state} ${facility.properties.zipcode}</h5>
    <h5>${formatPhone(facility.properties.phone_number)}</h5>
    <button id="myb"> Click </button>
    `
  }
}