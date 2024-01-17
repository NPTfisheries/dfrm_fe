import { Component, AfterViewInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';

import { BackendService } from 'src/_services/backend.service';
import * as L from 'leaflet';
import { formatPhone } from 'src/_utilities/formatPhone';
import { buildImageUrl } from 'src/_utilities/buildImageUrl';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit, OnChanges {

  @Output() facilitySlug = new EventEmitter<string>();
  @Input() facilities!: any;

  private map!: L.Map;
  imageUrl!: string;

  // customIcon = L.divIcon({
  //   className: 'custom-icon', // Define a CSS class for styling the icon
  //   html: '<i class="fa fa-location-dot fa-2xl" style="color:#a712de" ></i>', // Use the Font Awesome icon class
  //   iconSize: [10, 10], // Set the size of your custom icon (e.g., width: 32px, height: 32px)
  //   iconAnchor: [10, 20], // Set the icon anchor point [:top left] (usually half of iconSize for centering)
  //   popupAnchor: [0, 0] // Set the popup anchor point relative to the icon (adjust as needed)
  // });

  geojsonMarkerOptions = {
    radius: 8,
    fillColor: "#ff7800",
    color: 'black',
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
  };

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

    L.control.scale({ position: 'topright' }).addTo(this.map);

    this.addMarkers();
    this.addLegend();
  }

  addMarkers() {
    L.geoJSON(this.facilities, {
      style: function (feature) {
        // https://leafletjs.com/examples/geojson/
        switch (feature?.properties.facility_type.name) {
          case "Office": return { fillColor: 'blue' };
          case "Hatchery": return { fillColor: 'red' };
          default: return { fillColor: 'green' };  // Other
        }
      },
      pointToLayer: (feature, latlng) => {
        // Create a marker with the custom icon
        // return L.marker(latlng, {
        //   icon: this.customIcon,
        // });

        // circle markers
        return L.circleMarker(latlng, this.geojsonMarkerOptions);
      },
      onEachFeature: (feature: any, layer) => {
        const customPopupContent = this.facilityPopup(feature);
        layer.bindPopup(customPopupContent);

        layer.on('popupopen', () => {
          // set popup-card-img
          this.imageUrl = buildImageUrl(feature.properties.img_card.image);

          // Get the popup and update its content only if it exists
          const popup = layer.getPopup();
          if (popup) {
            popup.setContent(this.facilityPopup(feature));

            const button = document.getElementById('myb');
            if (button) {
              // set click listener
              button.addEventListener('click', () => {
                // console.log('button clicked', feature.id);
                this.facilitySlug.emit(feature.properties.slug);
              });
            }
          }
        });
      }
    }).addTo(this.map);
  }

  addLegend() {
    console.log('Add Legend Activated!');
    const legend = new (L.Control.extend({
      options: { position: 'bottomleft' },

      onAdd: function (map: L.Map) {
        console.log('Legend On Add!');
        const div = L.DomUtil.create('div', 'legend');
        const labels = ['Hatchery', 'Office', 'Other'];
        const colors = ['red', 'blue', 'green'];
        let legendContent = '<div style="background-color: white; padding: 10px; border-radius: 6px;">';
        for (let i = 0; i < labels.length; i++) {
          legendContent += '<div style="margin-bottom: 5px;"><span style="background:' + colors[i] + '; border-radius: 50%; width: 12px; height: 12px; display: inline-block;"></span>&nbsp;&nbsp;' + '<span style="font-size: 18px;">' + labels[i] + '</span></div>';
        }
        legendContent += '</div>';
        div.innerHTML = legendContent;
        console.log(div);
        return div;
      }
    }));
    legend.addTo(this.map);

  }

  facilityPopup(facility: any) {
    return `<div style="height:200px; width:250px; overflow:hidden; margin: 0 auto">
    <img style="width: 100%; height: 100%; object-fit: cover;" src="${this.imageUrl}" >
    </div> <br>
    <div style="text-align:center;">
    <h3>${facility.properties.name}</h3>
    <hr>
    <h5>${facility.properties.street_address}</h5>
    <h5>${facility.properties.city}, ${facility.properties.state} ${facility.properties.zipcode}</h5>
    <h5>${formatPhone(facility.properties.phone_number)}</h5>
    <br>
    <button id="myb" class="dfrm-button-small" > Facility Details </button>
    </div>
    `
  }

}