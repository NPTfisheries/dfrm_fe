import { Component, Input, OnInit } from '@angular/core';
import { buildImageUrl } from 'src/_utilities/buildImageUrl';

@Component({
  selector: 'app-invasive-species',
  templateUrl: './invasive-species.component.html',
  styleUrls: ['./invasive-species.component.css']
})
export class InvasiveSpeciesComponent implements OnInit {

  @Input() invasive: any | undefined;

  imageUrl!: string | undefined;
  mapUrl!: string | undefined;
  
  constructor() {}

  ngOnInit(): void {
    this.imageUrl = buildImageUrl(this.invasive.species_image);
    this.mapUrl = buildImageUrl(this.invasive.map_image);
  }
  
}
