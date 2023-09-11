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

  marker!: any;
  coordinates!: any;
  private map!: L.Map;

  ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap(): void {
    // start centered on pin if it's provided....
    if(this.input.value !== '') {
      this.coordinates = this.input.value;
      console.log('geometry set to', this.input.value);
      this.map = L.map('map').setView([this.coordinates[1], this.coordinates[0]], 8);
      this.marker = L.marker([this.coordinates[1], this.coordinates[0]]).addTo(this.map);
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
      this.updateCoordinates(e.latlng.lat, e.latlng.lng);

      if (this.marker) { this.map.removeLayer(this.marker); }
      this.marker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(this.map);
    })

  }

  updateCoordinates(latitude: number, longitude: number) {
    this.coordinates = [longitude, latitude];
    this.input.value = this.coordinates;
    this.form.get('coordinates')?.patchValue({coordinates: this.coordinates});
  }

}
