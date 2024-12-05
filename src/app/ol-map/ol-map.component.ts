import { Component, AfterViewInit, Input, OnInit } from '@angular/core';
import { FacilityPopupComponent } from '../facilities/facility-popup/facility-popup.component';

import Map from 'ol/Map';
import View from 'ol/View';

import TileLayer from 'ol/layer/Tile';
// import OSM from 'ol/source/OSM';
import XYZ from 'ol/source/XYZ';

import { Vector as VectorSource } from 'ol/source';
import { Vector as VectorLayer } from 'ol/layer';
import { ScaleLine, defaults as defaultControls } from 'ol/control';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { Style, Stroke, Fill, Icon, Circle } from 'ol/style';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-ol-map',
  templateUrl: './ol-map.component.html',
  styleUrls: ['./ol-map.component.css']
})
export class OlMapComponent implements OnInit, AfterViewInit {

  @Input() facilities!: any;

  public map!: Map;
  scalebar = new ScaleLine({ units: 'metric', bar: true, minWidth: 140 });
  alpha = 0.35; // for points - only need to adjust this value.
  facilityTypeColors: { [key: string]: string } = {
    Office: `rgba(0,0,255,${this.alpha})`,
    Hatchery: `rgba(0,255,0,${this.alpha})`,
    Other: `rgba(255,0,0,${this.alpha})`
  };
  public selectedFacility: any | null = null;

  constructor(
    private modalService: NgbModal
  ) { }

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
        new TileLayer({
          source: new XYZ({
            url: 'https://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer/tile/{z}/{y}/{x}',
            attributions: 'Tiles courtesy of the <a href="https://usgs.gov/">U.S. Geological Survey</a>',
            maxZoom: 20,
            minZoom: 7,
          }),
        }),
      ],
      controls: defaultControls().extend([this.scalebar])
    });
  }

  addPoints() {
    const vectorSource = new VectorSource();

    if (this.facilities && Array.isArray(this.facilities)) {
      this.facilities.forEach((facility: any) => {
        const coordinates = facility.geometry.coordinates;
        const facilityType = facility.properties.facility_type.name;

        const pointFeature = new Feature({
          geometry: new Point(coordinates),
          properties: facility.properties,
        });

        // Assign color if not already assigned
        if (!this.facilityTypeColors[facilityType]) {
          this.facilityTypeColors[facilityType] = this.getRandomColor();
        }

        pointFeature.setStyle(this.getStyleForFacility(facilityType));

        vectorSource.addFeature(pointFeature);
      });
    }

    const vectorLayer = new VectorLayer({
      source: vectorSource,
    });

    this.map.addLayer(vectorLayer);

    // tooltips
    this.addTooltipInteraction(vectorSource);
  }

  addTooltipInteraction(vectorSource: VectorSource) {
    this.map.on('singleclick', (event) => {
      this.map.forEachFeatureAtPixel(event.pixel, (feature) => {
        const facility = feature.get('properties');
        if (facility) {
          this.openFacilityPopup(facility);
        }
      });
    });
  }

  openFacilityPopup(facility: any) {
    const modalRef = this.modalService.open(FacilityPopupComponent, {
      keyboard: true, // can exit via Esc
      centered: true,
    });
    modalRef.componentInstance.facility = facility;
  }

  // point styling
  getStyleForFacility(facilityType: string): Style {
    return new Style({
      image: new Circle({
        radius: 8,
        fill: new Fill({ color: this.facilityTypeColors[facilityType] }),
        stroke: new Stroke({ color: 'black', width: 1.5 }), //border
      }),
    });
  }

  getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

}
