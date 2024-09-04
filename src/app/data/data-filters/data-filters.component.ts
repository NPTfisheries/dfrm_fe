import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { filterOptions } from 'src/_models/interfaces';
import { filterOptionsService } from 'src/_services/filter-options.service';

@Component({
  selector: 'app-data-filters',
  templateUrl: './data-filters.component.html',
  styleUrls: ['./data-filters.component.css']
})
export class DataFiltersComponent implements OnChanges {
  @Input() selectedDatastore!: number;
  @Output() dataFilters = new EventEmitter<any>(); // pass filter args back to data-page

  // filterOptions!: any; // Passed to filter components. Adjust to array eventually for looping through.

  filterOptions!: filterOptions[];
  filters: { [key: string]: any } = {};

  constructor(
    private filterOptionsService: filterOptionsService,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedDatastore'] && this.selectedDatastore) {
      this.filterOptions = this.filterOptionsService.getFilterOptions(this.selectedDatastore);
    } else {
      this.filterOptions = [];
    }
  }

  setFilters(value: any) {
    this.filters[Object.keys(value)[0]] = Object.values(value)[0];
    console.log(this.filters);

    this.dataFilters.emit(this.filters);
  }

}
