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
  facilityTypeColors: { [key: string]: string } = {
    Office: 'rgba(0,0,255,0.5)',
    Hatchery: 'rgba(0,255,0,0.5)',
    Other: 'rgba(255,0,0,0.5)'
  };
  public selectedFacility: any | null = null;
  public popupPosition: { x: number; y: number } | null = null;


  constructor(
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.initializeMap();
    this.createLegend();
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

        // Apply style based on facility type
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
          const [x, y] = event.pixel;
          this.openFacilityPopup(facility, { x, y });
        }
      });
    });
  }

  openFacilityPopup(facility: any, position: { x: number; y: number }) {
    const modalRef = this.modalService.open(FacilityPopupComponent, {
      // backdrop: 'static', // prevents closing by clicking outside modal
      keyboard: true, // can exit via Esc
      centered: true,
    });
  
    modalRef.componentInstance.facility = facility;
  }

  // point styling
  getStyleForFacility(facilityType: string): Style {
    const color = this.facilityTypeColors[facilityType] || this.getRandomColor();
    return new Style({
      image: new Circle({
        radius: 8,
        fill: new Fill({ color: color }),
        stroke: new Stroke({ color: 'white', width: 2 }), // Optional white border
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

  createLegend() {
    const legendContainer = document.getElementById('legend-items');

    if (!legendContainer) return;

    // Clear existing legend items
    legendContainer.innerHTML = '';

    // Get unique facility types from facilities data
    const uniqueFacilityTypes = [...new Set(this.facilities.map((facility: any) => facility.properties.facility_type.name))];

    uniqueFacilityTypes.forEach((type) => {
      const color = this.facilityTypeColors[String(type)] || this.getRandomColor();
      console.log(`Legend color for ${type}: ${color}`); // Debug log

      // Create legend item
      const legendItem = document.createElement('div');
      legendItem.className = 'legend-item';
      legendItem.innerHTML = `<div class="legend-item" style="margin-bottom: 5px;"><span style="background: ${color}; border: 1px solid black; border-radius: 50%; width: 16px; height: 16px; display: inline-block;"></span><span class="legend-item"> ${type}</span></div>`;

      legendContainer.appendChild(legendItem);
    });
  }

}
