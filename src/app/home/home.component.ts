import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { BackendService } from 'src/_services/backend.service';

import { InputBase } from 'src/_inputs/input-base';
import { InputService } from 'src/_services/input.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  token: any | null = null;
  inputs$: Observable<InputBase<any>[]>;

  constructor(
    private backendService: BackendService,
    private inputService: InputService,
  ) {
    this.inputs$ = this.inputService.getInputs();
  }

  hitAPI() {
    this.backendService.options('/api/v1/division/1/').subscribe(response => {
      console.log(response);
    })
  }

}
