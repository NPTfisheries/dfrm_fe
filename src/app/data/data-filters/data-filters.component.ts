import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FilterOptionsService } from 'src/_services/filter-options.service';
import { filterOptions } from 'src/_models/interfaces';

@Component({
  selector: 'app-data-filters',
  templateUrl: './data-filters.component.html',
  styleUrls: ['./data-filters.component.css']
})
export class DataFiltersComponent {
  @Input() selectedDatastore!: number;
  @Output() dataFilters = new EventEmitter<any>(); // pass filter args back to data-page

  // filterOptions!: any; // Passed to filter components. Adjust to array eventually for looping through.

  filterOptions!: filterOptions[];
  filters: { [key: string]: any } = {};

  constructor(
    private filterOptionsService: FilterOptionsService,
  ) { }

  ngOnInit(): void {
    this.buildFilterOptions();
  }

  // build options to pass necessary info to filter components
  buildFilterOptions() {
    this.filterOptions = this.filterOptionsService.reddData()
    // this.filterOptions = [
    //   {
    //     argName: 'project'
    //   },
    //   {
    //     options: [
    //       { 'value': '2020', 'label': '2020' },
    //       { 'value': '2021', 'label': '2021' },
    //       { 'value': '2022', 'label': '2022' },
    //       { 'value': '2023', 'label': '2023' },
    //       { 'value': '2024', 'label': '2024' }
    //     ],
    //     placeholder: 'Survey Year',
    //     argName: 'SurveyYear'
    //   },
    //   {
    //     options: [
    //       { 'value': 'All', 'label': 'All' },
    //       { 'value': 'Recapture', 'label': 'Recapture' },
    //       { 'value': 'Mark', 'label': 'Mark' },
    //       { 'value': 'Recovery', 'label': 'Recovery' },
    //       { 'value': 'Tally', 'label': 'Tally' },
    //       { 'value': 'Passive Recapture', 'label': 'Passive Recapture' }
    //     ],
    //     placeholder: 'Event Type',
    //     argName: 'eventType'
    //   }
    // ];
  }

  setFilters(value: any) {
    this.filters[Object.keys(value)[0]] = Object.values(value)[0];
    console.log(this.filters);
    
    this.dataFilters.emit(this.filters);
  }

}
