import { Component, OnInit, SimpleChanges, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import * as L from 'leaflet';

@Component({
  selector: 'app-geometry-input',
  templateUrl: './geometry-input.component.html',
  styleUrls: ['./geometry-input.component.css']
})
export class GeometryInputComponent implements OnInit {

  @Input() form!: FormGroup;

  geometryControl!: FormControl;

  // exampleGeometry = { 
  //   "type": "Point",
  //   "coordinates": [ -116, 44.0 ]
  // }

  marker!: any;
  geometry!: any;
  private map!: L.Map;

  ngOnInit(): void {
    this.geometryControl = new FormControl(this.geometry);
    this.form.addControl('geometry', this.geometryControl);
  }

  ngAfterViewInit(): void {
    this.initMap();
    if (this.geometry) {
      this.setMarker(this.geometry.coordinates[1], this.geometry.coordinates[0]);
    }
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
      console.log('Latitude:', e.latlng.lat);
      console.log('Longitude:', e.latlng.lng);
      this.buildGeometry(e.latlng.lat, e.latlng.lng);

      if(this.marker) {
        this.map.removeLayer(this.marker);
      }
      this.marker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(this.map);
    })

  }

  buildGeometry(latitude: number, longitude: number) {
    this.geometry = {
      "type": "Point",
      "coordinates": [longitude, latitude]
    };
  }

  showGeometry() {
    console.log(this.geometry);
  }

  setMarker(latitude: number, longitude: number) {
    const marker = L.marker([longitude, latitude]).addTo(this.map)
  }
}
