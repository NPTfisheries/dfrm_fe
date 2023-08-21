import { Component, OnInit, Input } from '@angular/core';
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

  @Input() inputs: InputBase<string>[] | null = [];
  @Input() url!: string;
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
    // this.payload= JSON.stringify(this.form.getRawValue());
    // console.log(this.payload);
    console.log(this.form.value);
    console.log(this.url);

    this.backendService.post(this.url, this.form.value).subscribe(response => {
      console.log(response);
      
      this.activeModal.close();
    });

  }
}
