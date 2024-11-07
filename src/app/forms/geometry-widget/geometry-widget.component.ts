import { Component, Input, OnInit } from '@angular/core';
import { InputBase } from 'src/_inputs/input-base';
import { FormGroup } from '@angular/forms';

import Map from 'ol/Map';
import Draw from 'ol/interaction/Draw'
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { Vector as VectorSource } from 'ol/source'
import { Vector as VectorLayer } from 'ol/layer'
import { fromLonLat } from 'ol/proj';
// import { boundingExtent } from 'ol/extent';
import Collection from 'ol/Collection';
import { Feature } from 'ol';
// import { Geometry } from 'ol/geom';
import { ScaleLine, defaults as defaultControls } from 'ol/control'
import GeoJSON from 'ol/format/GeoJSON'

@Component({
  selector: 'app-geometry-widget',
  templateUrl: './geometry-widget.component.html',
  styleUrls: ['./geometry-widget.component.css']
})
export class GeometryWidgetComponent implements OnInit {

  @Input() input!: InputBase<string>;
  @Input() form!: FormGroup;

  public map!: Map;
  selectedGeom: string | undefined;
  draw: any;
  source = new VectorSource({});
  tile_layer = new TileLayer({ source: new OSM() });   // basemap tiles
  vector_layer = new VectorLayer({ source: this.source }) // layer for this.draw
  scalebar = new ScaleLine({ units: 'metric', bar: true, minWidth: 140, });

  feature = Collection<Feature>;

  ngOnInit(): void {
    // console.log('GeometryWidget:', this.input.value);

    this.map = new Map({
      view: new View({
        center: fromLonLat([-116.087802, 45.25], 'EPSG:4326'),  // this needs to focus on the geometry, if exists.
        projection: 'EPSG:4326',
        zoom: 6,
      }),
      layers: [this.tile_layer, this.vector_layer],
      controls: defaultControls().extend([this.scalebar]),
      target: 'ol-map'
    });

    // edit (targets existing geom)
    if (this.input.value && this.input.value !== '') {
      this.selectedGeom = Object(this.input.value).type;
      const format = new GeoJSON();
      const geometry = format.readGeometry(this.input.value, {
        featureProjection: 'EPSG:4326'
      });
      const feature = new Feature({geometry});
      this.source.addFeature(feature);

      this.map.getView().fit(geometry.getExtent(), {size: this.map.getSize(), maxZoom: 14});
    }
  }

  updateGeom(value: any) {
    this.source.clear();

    if (this.draw) { this.map.removeInteraction(this.draw) }

    this.draw = new Draw({
      source: this.source,
      type: value
    });

    this.map.addInteraction(this.draw);

    // only allow a single feature to be drawn and capture geometry
    this.draw.on('drawend', (event: any) => {
      const geometry = event.feature.getGeometry();
      const format = new GeoJSON();
      const geoJson = format.writeGeometry(geometry);
      console.log(geoJson);

      if (this.form && this.input && this.form.controls[this.input.key]) {
        this.form.controls[this.input.key].setValue(geoJson);
      }

      this.map.removeInteraction(this.draw);
    });

  }

  removeLastPoint(event: any) {
    event.preventDefault();
    this.draw.removeLastPoint();
  }

  disableButton():boolean {
    if(this.selectedGeom === undefined || !['LineString', 'Polygon'].includes(this.selectedGeom)) { return true }
    return false;
  }

}
