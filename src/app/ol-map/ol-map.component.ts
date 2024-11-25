import { Component, AfterViewInit, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { formatPhone } from 'src/_utilities/formatPhone';
import { buildImageUrl } from 'src/_utilities/buildImageUrl';

import Map from 'ol/Map';
import View from 'ol/View';

import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import XYZ from 'ol/source/XYZ';

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
  facilityTypeColors: { [key: string]: string } = {
    Office: 'blue',
    Hatchery: 'green',
    Other: 'red'
  };

  constructor(private router: Router) { }

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
        // new TileLayer({ source: new OSM() })
        // new TileLayer({
        //   source: new XYZ({
        //     url: 'https://stamen-tiles.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg',
        //     attributions: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>',
        //   }),
        // }),
        // new TileLayer({
        //   source: new XYZ({
        //     url: 'http://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}', // Replace "r" with "s" for satellite, "h" for hybrid
        //   }),
        // }),
        // new TileLayer({
        //   source: new XYZ({
        //     url: 'https://{1-4}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
        //     attributions:
        //       '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a> &copy; <a href="https://carto.com/">CARTO</a>',
        //   }),
        // }),
        // new TileLayer({
        //   source: new TileArcGISRest({
        //     url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer',
        //   }),
        // }),
        new TileLayer({
          source: new XYZ({
            url: 'https://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer/tile/{z}/{y}/{x}',
            attributions: 'Tiles courtesy of the <a href="https://usgs.gov/">U.S. Geological Survey</a>',
            maxZoom: 20,
            minZoom: 7,
          }),
        }),
        // new TileLayer({
        //   source: new XYZ({
        //     url: 'https://tiles.maps.eox.at/eox-basemap/{z}/{x}/{y}.png',
        //     attributions: 'Map tiles by <a href="https://eox.at/">EOX</a>',
        //     maxZoom: 10,
        //   }),
        // }),
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
    // Create an overlay for the tooltip
    const popupElement = document.createElement('div');
    popupElement.style.position = 'absolute';
    popupElement.style.background = 'white';
    popupElement.style.border = '1px solid black';
    popupElement.style.borderRadius = '4px';
    popupElement.style.padding = '10px';
    popupElement.style.pointerEvents = 'auto'; // Allow interaction with the popup
    popupElement.style.display = 'none'; // Initially hidden

    document.body.appendChild(popupElement);

    this.map.on('singleclick', (event) => {
      // Hide tooltip initially
      popupElement.style.display = 'none';

      // Get the features at the clicked location
      this.map.forEachFeatureAtPixel(event.pixel, (feature) => {
        const facility = feature.get('properties'); // Get the name or title property
        if (facility) {
          // Position the tooltip near the clicked point
          popupElement.innerHTML = this.facilityPopup(facility);
          popupElement.style.left = `${event.originalEvent.pageX}px`;
          popupElement.style.top = `${event.originalEvent.pageY}px`;
          popupElement.style.display = 'block';
        }
      });
    });

    // Listen for button clicks within the popup
    popupElement.addEventListener('click', (event: Event) => {
      const target = event.target as HTMLElement;
      console.log(event);
      if (target.tagName === 'BUTTON' && target.dataset['slug']) {
        const slug = target.dataset['slug'];
        this.router.navigate([`/facilities/${slug}`]); // Navigate to the desired route
        popupElement.style.display = 'none';
      }
    });

    // Hide the tooltip when clicking on map (no feature)
    this.map.on('click', (event) => {
      const clickedOnFeature = this.map.forEachFeatureAtPixel(event.pixel, () => true);
      if (!clickedOnFeature) {
        popupElement.style.display = 'none';
      }
    });

    // Hide the popup when clicking elsewhere in the application
    document.addEventListener('click', (event: MouseEvent) => {
      if (!(event.target as HTMLElement).closest('div')) {
        popupElement.style.display = 'none';
      }
    });

  }

  // HTML for the popup
  facilityPopup(facility: any) {
    // console.log('facility popup:', facility);
    return `<div style="height:200px; width:250px; overflow:hidden; margin: 0 auto">
    <img style="width: 100%; height: 100%; object-fit: cover;" src="${buildImageUrl(facility.img_card.image)}" >
    </div> <br>
    <div style="text-align:center;">
    <h3>${facility.name}</h3>
    <hr>
    <h5>${facility.street_address}</h5>
    <h5>${facility.city}, ${facility.state} ${facility.zipcode}</h5>
    <h5>${formatPhone(facility.phone_number)}</h5>
    <br>
    <button id="myb" class="dfrm-button-small" data-slug="${facility.slug}"> Facility Details </button>
    </div>
    `
  }

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

}
