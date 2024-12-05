import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { formatPhone } from 'src/_utilities/formatPhone';
import { buildImageUrl } from 'src/_utilities/buildImageUrl';


@Component({
  selector: 'app-facility-popup',
  templateUrl: './facility-popup.component.html'
})
export class FacilityPopupComponent {
  @Input() facility: any;

  // make functions useable in html
  formatPhone = formatPhone;
  buildImageUrl = buildImageUrl;

  constructor(
    private router: Router,
    private activeModal: NgbActiveModal,
  ) { }


  onClick() {
    // console.log('onClick', this.facility.slug);
    this.router.navigate(['facilities/' + this.facility.slug]);
    this.activeModal.close();
  }

}
