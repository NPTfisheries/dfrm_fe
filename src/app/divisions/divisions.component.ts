import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { Division } from 'src/_models/division';


@Component({
  selector: 'app-divisions',
  templateUrl: './divisions.component.html',
  styleUrls: ['./divisions.component.css']
})
export class DivisionsComponent {

  // divisionList$: Observable<Division[] | null>;

  constructor(
    // private divisionService: DivisionService,
    public modalService: NgbModal,
    private router: Router,
  ) {
  }

  ngOnInit() {
    // this.divisionService.getDivisionList().subscribe(list => {
    //   console.log('getDivisionList:', list);
    //   this.divisionList$ = list;
    // });
  }
}

