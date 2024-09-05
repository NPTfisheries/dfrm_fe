import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CdmsService } from 'src/_services/cdms.service';

@Component({
  selector: 'app-location-filter',
  templateUrl: './location-filter.component.html',
  styleUrls: ['./location-filter.component.css']
})
export class LocationFilterComponent implements OnChanges {
  @Input() selectedDatastore!: number;

  @Output() locationValue = new EventEmitter<any>();

  locations: any = [];
  selectedLocation!: number | null;
  filter: any = {};

  constructor(
    private cdmsService: CdmsService,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedDatastore'] && this.selectedDatastore) {
      this.getOptions();
      this.selectedLocation = null;
    } else {
      // Clear projects if selectedDatastore is not set
      this.locations = [];
    }
  }

  handleChange(value: number | null) {
    var filter = { 'DatasetID': value };
    this.selectedLocation = value;
    this.locationValue.emit(filter);
  }

  getOptions() {
    this.cdmsService.getLocations().subscribe(locations => {
      // let list: any = []
      // locations.forEach(dataset => {
      //   list.push(
      //     {
      //       'Id': dataset.datasetId,
      //       'Name': dataset.projectName
      //     }
      //   )
      // });
      this.locations = locations;
    });
  }

}
