import { Component, OnInit } from '@angular/core';
import { Department } from 'src/_models/department';
import { BackendService } from 'src/_services/backend.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  token: any | null = null;
  data: Department | undefined;
  bannerImage!: string;

  constructor(
    private backendService: BackendService,
  ) {  }

  ngOnInit(): void {
    // we only have 1 department for the time being.
    this.backendService.get('/api/v1/department/')
    .subscribe(department => {   
      this.data = department[0];

      this.getImage(department[0].img_banner.slug);
    });
  }
  
  getImage(slug: string) {
    this.backendService.getImageBySlug(slug).subscribe((response: any) => {
      console.log(response);
      // response.image is similar to: "http://localhost:4200/media/images/uploaded/saturn_79MFAAl.jpg"
      const alteredUrl = response.image.replace('localhost:4200', 'localhost:8000');

      this.bannerImage = alteredUrl;
    });
  }

}
