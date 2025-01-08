import { Component, OnInit } from '@angular/core';
import { InvasiveSpecies, LookUp } from 'src/_models/interfaces';
import { InvasivesService } from 'src/_services/invasives.service';
import { LookUpService } from 'src/_services/lookup.service';


@Component({
  selector: 'app-invasives',
  templateUrl: './invasives.component.html',
  styleUrls: ['./invasives.component.css']
})
export class InvasivesComponent implements OnInit {

  invasives: InvasiveSpecies[] =  [];
  types: LookUp[] = [];
  selectedType: string | undefined = undefined;

  constructor(
    private lookupService: LookUpService,
    private invasivesService: InvasivesService,
  ) { }

  ngOnInit(): void {
    this.lookupService.getLookUpsByObjectType('Invasive').subscribe(types => {
        this.types = types;
    });

    this.invasivesService.getInvasives().subscribe(invasives => {
      this.invasives = invasives;
    });
  }

  selectType(invasive_type_name: string) {
    this.selectedType = invasive_type_name;
    console.log('Selected type:', invasive_type_name);
  }

  filteredInvasives() {
    return this.invasives.filter((invasive: any) => invasive.invasive_type.name === this.selectedType);
  }

  print() {
    console.log('Species:', this.invasives);
    console.log('Types:', this.types);
  }

}
