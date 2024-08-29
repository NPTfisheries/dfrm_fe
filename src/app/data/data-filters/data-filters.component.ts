import { Component, Output, EventEmitter } from '@angular/core';
// import { CdmsService } from 'src/_services/cdms.service';

interface filterOptions {
  options?: Object[];
  placeholder?: string;
  argName?: string;
}

@Component({
  selector: 'app-data-filters',
  templateUrl: './data-filters.component.html',
  styleUrls: ['./data-filters.component.css']
})
export class DataFiltersComponent {
  @Output() dataFilters = new EventEmitter<any>(); // pass filter args back to data-page

  // filterOptions!: any; // Passed to filter components. Adjust to array eventually for looping through.

  filterOptions!: filterOptions[];
  filters: any[] = [];

  constructor(
    // private cdmsService: CdmsService,
  ) { }

  ngOnInit(): void {
    this.buildFilterOptions();
  }

  // build options to pass necessary info to filter components
  buildFilterOptions() {
    this.filterOptions = [
      {
        argName: 'project'
      },
      {
        options: [
          { 'value': '2020', 'label': '2020' },
          { 'value': '2021', 'label': '2021' },
          { 'value': '2022', 'label': '2022' },
          { 'value': '2023', 'label': '2023' },
          { 'value': '2024', 'label': '2024' }
        ],
        placeholder: 'Brood Year',
        argName: 'broodYear'
      },
      {
        options: [
          { 'value': 'All', 'label': 'All' },
          { 'value': 'Recapture', 'label': 'Recapture' },
          { 'value': 'Mark', 'label': 'Mark' },
          { 'value': 'Recovery', 'label': 'Recovery' },
          { 'value': 'Tally', 'label': 'Tally' },
          { 'value': 'Passive Recapture', 'label': 'Passive Recapture' }
        ],
        placeholder: 'Event Type',
        argName: 'eventType'
      }
    ];
  }

  setFilters(value: any) {

    console.log('INITIAL findIndex:', this.filters.findIndex(filter => filter.argName === value.argName));
    console.log('INITIAL find:', this.filters.find((filter) => filter.argName === value.argName));
      
    if (this.filters.find(filter => filter.argName === value.argName)) {
      this.filters.splice(this.filters.findIndex(filter => filter.argName === value.argName), 1, value);
    } else {
      this.filters.push(value);
    }

    if (value.value === null) {
      this.filters.splice(this.filters.findIndex(filter => filter.argName === value.argName), 1);
    }

    // console.log(`data-filters: ${this.filters}`)
    console.log('AFTER findIndex:', this.filters.findIndex(filter => filter.argName === value.argName));
    console.log('AFTER find:', this.filters.find((filter) => filter.argName === value.argName));

    this.dataFilters.emit(this.filters);
  }

}
