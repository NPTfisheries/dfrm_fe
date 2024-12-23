import { Component, Input, OnInit } from '@angular/core';
import { buildImageUrl } from 'src/_utilities/buildImageUrl';

@Component({
  selector: 'app-invasive-species',
  templateUrl: './invasive-species.component.html',
  styleUrls: ['./invasive-species.component.css']
})
export class InvasiveSpeciesComponent implements OnInit {

  @Input() invasive: any | undefined;

  speciesImageUrl!: string | undefined;
  image1Url!: string | undefined;
  image2Url!: string | undefined;
  
  constructor() {}

  ngOnInit(): void {
    this.speciesImageUrl = buildImageUrl(this.invasive.species_image);
    this.image1Url = buildImageUrl(this.invasive.image1);
    this.image2Url = buildImageUrl(this.invasive.image2);
  }
  
}
