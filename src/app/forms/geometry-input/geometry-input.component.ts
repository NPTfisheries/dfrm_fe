import { Component, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { InputBase } from 'src/_inputs/input-base';

import * as L from 'leaflet';

@Component({
  selector: 'app-geometry-input',
  templateUrl: './geometry-input.component.html',
  styleUrls: ['./geometry-input.component.css']
})
export class GeometryInputComponent {

  @Input() input!: InputBase<string>;
  @Input() form!: FormGroup;

  geometryControl!: FormControl;

  marker!: any;
  geometry!: any;
  private map!: L.Map;

  ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap(): void {
    // start centered on pin if it's provided....
    if(this.input.value !== '') {
      this.geometry = this.input.value;
      this.map = L.map('map').setView([this.geometry.coordinates[1], this.geometry.coordinates[0]], 8);
      this.marker = L.marker([this.geometry.coordinates[1], this.geometry.coordinates[0]]).addTo(this.map);
    } else {
      // otherwise we center someplace else.
      this.map = L.map('map').setView([45.25, -116.087802], 8);
    }
    
    L.tileLayer('https://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Tiles courtesy of the <a href="https://usgs.gov/">U.S. Geological Survey</a>',
      maxZoom: 20,
      minZoom: 7
    }).addTo(this.map);

    this.map.on('click', (e: L.LeafletMouseEvent) => {
      console.log('Latitude:', e.latlng.lat);
      console.log('Longitude:', e.latlng.lng);
      this.updateGeometry(e.latlng.lat, e.latlng.lng);

      if (this.marker) { this.map.removeLayer(this.marker); }
      this.marker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(this.map);
    })

  }

  updateGeometry(latitude: number, longitude: number) {
    this.geometry = {
      "type": "Point",
      "coordinates": [longitude, latitude]
    };

    this.input.value = this.geometry;
  }

}
