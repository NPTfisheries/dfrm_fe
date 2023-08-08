import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { BackendService } from 'src/_services/backend.service';
import { AddEditPageComponent } from '../add-edit-page/add-edit-page.component';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.css']
})
export class ListPageComponent implements OnInit {

  routeType: string | undefined;
  list: any | undefined;
  options: any | undefined;
  columns: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private backendService: BackendService,
    private modalService: NgbModal,
  ) { }


  ngOnInit(): void {
    this.route.url.subscribe(urlSegments => {
      if (urlSegments.length > 0) {
        this.routeType = urlSegments[0].path;
        this.populateFieldsArray();
      }

      this.backendService.get('/api/v1/' + this.routeType + '/').subscribe(list => {
        this.list = list;
      });

      this.backendService.options('/api/v1/' + this.routeType + '/').subscribe(options => {
        this.options = options;
      });



    });
  }

  add() {
    this.modalService.open(AddEditPageComponent, { size: 'xl' });
  }

  clicky() {
    console.log('list:', this.list);
    console.log('opts:', this.options);
  }

  populateFieldsArray() {
    switch (this.routeType) {
      case 'department':
      case 'division':
      case 'project':
        this.columns = ['name', 'manager', 'deputy', 'assistant', 'is_active'];
        break;
      case 'user':
        this.columns = ['first_name', 'last_name', 'email'];
        break;
      default:
        this.columns = [];
        break;
    }


  }

}
