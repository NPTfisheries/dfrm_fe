import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {
  @Input() filterOptions: any;

  @Output() filterValue = new EventEmitter<any>();

  options: any = [];
  selectedOption!: string;
  placeholder!: string;

  constructor(
  ) { }

  ngOnInit(): void {
    this.setOptions();
  }

  handleChange(value: string) {
    var filter = { [this.filterOptions.argName]: value };
    // console.log('Filter:', filter);
    this.selectedOption = value;
    this.filterValue.emit(filter);
  }

  setOptions() {
    this.options = this.filterOptions.options;
    this.placeholder = this.filterOptions.placeholder;
  }

}
