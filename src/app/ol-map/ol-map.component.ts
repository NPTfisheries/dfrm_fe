import { Component, AfterViewInit, Input, OnInit, SimpleChanges } from '@angular/core';

import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { Vector as VectorSource } from 'ol/source';
import { Vector as VectorLayer } from 'ol/layer';
import { fromLonLat } from 'ol/proj';
import { ScaleLine, defaults as defaultControls } from 'ol/control';
import GeoJSON from 'ol/format/GeoJSON';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { Style, Stroke, Fill, Icon, Circle } from 'ol/style';

@Component({
  selector: 'app-ol-map',
  templateUrl: './ol-map.component.html',
  styleUrls: ['./ol-map.component.css']
})
export class OlMapComponent implements OnInit, AfterViewInit {

  @Input() facilities!: any;

  public map!: Map;
  scalebar = new ScaleLine({ units: 'metric', bar: true, minWidth: 140 });

  ngOnInit(): void {
    this.initializeMap();
  }

  ngAfterViewInit(): void {
      this.addPoints();
  }

  initializeMap() {
    this.map = new Map({
      target: 'ol-map',
      view: new View({
        center: [-116.087802, 45.25],  
        projection: 'EPSG:4326',
        zoom: 7,
        minZoom: 7
      }),
      layers: [
        new TileLayer({ source: new OSM() })
      ],
      controls: defaultControls().extend([this.scalebar])
    });
  }

  addPoints() {
    const vectorSource = new VectorSource();

    console.log(this.facilities); // this isn't ready - probably ngOnChanges.
    const point1 = new Feature({
      geometry: new Point([-116.0060, 45.7128]),
    });
    const point2 = new Feature({
      geometry: new Point([-117.1278, 44.5074]), 
    });

    vectorSource.addFeatures([point1, point2]);

    const vectorLayer = new VectorLayer({
      source: vectorSource,
      style: new Style({
        // image: new Icon({
        //   src: '../assets/location-dot-solid.svg',
        //   scale: 0.1,
        //   anchorOrigin: 'bottom-right'
        // })
        image: new Circle({
          radius: 5,
          fill: new Fill({color: 'rgba(0,0,255,1)'}),
          stroke: new Stroke({color: 'red', width: 1}),
        })
      })
    });
    
    console.log('I am here', vectorLayer);
    this.map.addLayer(vectorLayer);
    // const ftrs = {
    //   "type": "FeatureCollection",
    //   "crs": {
    //     'type': 'name',
    //     'properties': {
    //       'name': 'EPSG:4326',
    //     }
    //   },
    //   "features": this.facilities
    // };
  }

}
