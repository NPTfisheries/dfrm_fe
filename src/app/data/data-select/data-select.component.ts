import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { ActivityService } from 'src/_services/activity.service';
import { ProjectService } from 'src/_services/project.service';

@Component({
  selector: 'app-data-select',
  templateUrl: './data-select.component.html',
  styleUrls: ['./data-select.component.css']
})
export class DataSelectComponent implements OnInit {

  @Input() key!: string;
  @Input() options!: any[];
  @Output() inputValue = new EventEmitter<any>(); // pass selected value back to parent

  selectedOption!: any;
  required!: boolean;
  placeholder!: string;

  constructor(
  ) { }

  ngOnInit(): void {
    switch (this.key) {
      case 'datasets':
        this.required = true;
        this.placeholder = 'Select Dataset';
        break;
      case 'instruments':
        break
      case 'projects':
        this.required = true;
        this.placeholder = 'Select Project';
        break;
    }
  }

  emitValue(value: any) {
    this.inputValue.emit(value);
  }

}
