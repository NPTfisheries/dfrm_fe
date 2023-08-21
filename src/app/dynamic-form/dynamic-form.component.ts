import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { InputBase } from 'src/_inputs/input-base';
import { InputControlService } from 'src/_services/input-control.service';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css']
})
export class DynamicFormComponent implements OnInit {

  @Input() inputs: InputBase<string>[] | null = [];
  form!: FormGroup;
  payload = '';

  constructor(
    private ics: InputControlService,
  ) { }

  ngOnInit(): void {
    this.form = this.ics.toFormGroup(this.inputs as InputBase<string>[]);
  }

  onSubmit() {
    this.payload= JSON.stringify(this.form.getRawValue());
    console.log(this.payload);
  }
}
