import { Component, OnInit } from '@angular/core';
import { InvasiveSpecies } from 'src/_models/interfaces';
import { InvasivesService } from 'src/_services/invasives.service';


@Component({
  selector: 'app-invasives',
  templateUrl: './invasives.component.html',
  styleUrls: ['./invasives.component.css']
})
export class InvasivesComponent implements OnInit {

  invasives: InvasiveSpecies[] =  [];

  constructor(
    private invasivesService: InvasivesService,
  ) { }

  ngOnInit(): void {
    this.invasivesService.getInvasives().subscribe(invasives => {
      this.invasives = invasives;
    });
  }

  print() {
    console.log(this.invasives);
  }

}
