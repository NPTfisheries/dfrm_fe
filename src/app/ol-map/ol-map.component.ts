import { Component, AfterViewInit, Input, OnInit, ElementRef } from '@angular/core';
import { FacilityPopupComponent } from '../facilities/facility-popup/facility-popup.component';

import Map from 'ol/Map';
import View from 'ol/View';

import TileLayer from 'ol/layer/Tile';
// import OSM from 'ol/source/OSM';
import XYZ from 'ol/source/XYZ';
import { Overlay } from 'ol';
import { fromLonLat } from 'ol/proj';
import { Vector as VectorSource } from 'ol/source';
import { Vector as VectorLayer } from 'ol/layer';
import { ScaleLine, defaults as defaultControls } from 'ol/control';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { Style, Stroke, Fill, Icon, Circle } from 'ol/style';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

const colors = [
  "rgba(255, 255, 0, 0.35)",   // yellow
  "rgba(255, 0, 0, 0.35)",     // red
  "rgba(0, 0, 255, 0.35)",     // blue
  "rgba(0, 128, 0, 0.35)",     // green
  "rgba(255, 165, 0, 0.35)",   // orange
  "rgba(165, 42, 42, 0.35)",   // brown
  "rgba(128, 128, 128, 0.35)", // gray
  "rgba(255, 192, 203, 0.35)", // pink
  "rgba(0, 255, 255, 0.35)",   // cyan
  "rgba(255, 0, 255, 0.35)"    // magenta
];

@Component({
  selector: 'app-ol-map',
  templateUrl: './ol-map.component.html',
  styleUrls: ['./ol-map.component.css']
})
export class OlMapComponent implements OnInit, AfterViewInit {

  @Input() facilities!: any;

  public map!: Map;
  scalebar = new ScaleLine({ units: 'metric', bar: true, minWidth: 140 });
  facilityTypeColors: { [key: string]: string } = {};
  colorIndex = 0;
  public selectedFacility: any | null = null;

  private tooltip!: HTMLElement;
  private hoverText!: Overlay;

  constructor(
    private modalService: NgbModal,
    private elRef: ElementRef
  ) { }

  ngOnInit(): void {
    this.initializeMap();
  }

  ngAfterViewInit(): void {
    this.tooltip = this.elRef.nativeElement.querySelector('.ol-tooltip');
    this.addPoints();
  }

  initializeMap() {
    this.map = new Map({
      target: 'ol-map',
      view: new View({
        center: [-116.5, 45.75],
        projection: 'EPSG:4326',
        zoom: 9,
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
          this.facilityTypeColors[facilityType] = this.getNextColor();
        }

        pointFeature.setStyle(this.getStyleForFacility(facilityType));

        vectorSource.addFeature(pointFeature);
      });
    }

    const vectorLayer = new VectorLayer({
      source: vectorSource,
      // declutter: true //doesn't work as desired.
    });

    this.map.addLayer(vectorLayer);

    // tooltips
    this.addTooltipInteraction(vectorSource);
  }

  private createHoverText(coordinates: any) {
    this.hoverText = new Overlay({
      element: this.tooltip,
      autoPan: true,
      positioning: 'bottom-center',
      position: coordinates
    });
    this.map.addOverlay(this.hoverText);
  }

  addTooltipInteraction(vectorSource: VectorSource) {
    // tooltip on hover.
    this.map.on('pointermove', (event) => {
      const features = this.map.getFeaturesAtPixel(event.pixel);

      if (features.length > 0) {
        const names = features.map(feature => feature.get('properties').name);
        this.tooltip.innerHTML = names.join('<br>');
        this.tooltip.style.display = 'block';

        // Use map.getCoordinateFromPixel for accurate positioning
        const coordinates = this.map.getCoordinateFromPixel(event.pixel); // this returns lat/long

        this.createHoverText(coordinates);

      } else {
        this.tooltip.style.display = 'none';
      }
    });

    // clicka point to open modal
    this.map.on('singleclick', (event) => {
      const features = this.map.getFeaturesAtPixel(event.pixel);
      // if stacked dots, only opens one.
      if (features.length > 0) {
        // Get the first feature
        const feature = features[0];
        const facility = feature.get('properties');

        // Open the popup with the first feature's properties
        this.openFacilityPopup(facility);
      }
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

  getNextColor(): string {
    const color = colors[this.colorIndex];
    this.colorIndex = (this.colorIndex + 1) % colors.length;
    return color;
  }

}
