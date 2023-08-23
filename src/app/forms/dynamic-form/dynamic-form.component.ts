import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { InputBase } from 'src/_inputs/input-base';
import { InputControlService } from 'src/_services/input-control.service';
import { BackendService } from 'src/_services/backend.service';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css']
})
export class DynamicFormComponent implements OnInit {

  @Output() formSubmitted: EventEmitter<void> = new EventEmitter<void>;

  @Input() routeType!: string;
  @Input() inputs: InputBase<string>[] | null = [];
  @Input() slug!: string;
  form!: FormGroup;
  payload = '';

  constructor(
    private ics: InputControlService,
    private backendService: BackendService,
    private activeModal: NgbActiveModal,
  ) { }

  ngOnInit(): void {
    this.form = this.ics.toFormGroup(this.inputs as InputBase<string>[]);
  }

  onSubmit() {
    console.log(this.form.value);
    
    let formRequest$;

    if(this.slug === undefined) {
      this.backendService.newItem(this.routeType, this.form.value).subscribe({
        next: () => {this.formSubmitted.emit();}
      });
    } else {
      this.backendService.updateItem(this.routeType, this.slug, this.form.value).subscribe({
        next: () => {this.formSubmitted.emit();}
      });
    }
  }
  
}
