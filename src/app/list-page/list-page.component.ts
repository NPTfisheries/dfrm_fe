import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { BackendService } from 'src/_services/backend.service';
import { AddEditPageComponent } from '../add-edit-page/add-edit-page.component';

type Action = 'add' | 'edit';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.css']
})
export class ListPageComponent implements OnInit {

  routeType: string | undefined;
  list: any | undefined;
  columns: string[] = [];
  url: string = '';

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
        this.url = '/api/v1/' + this.routeType + '/';
      }

      this.backendService.get(this.url).subscribe(list => {
        this.list = list;
      });

    });
  }

  addOrEdit(action: Action, slug: string|undefined) {
    const modalOptions: NgbModalOptions = {
      size: 'xl',
        };
      
    const modalRef = this.modalService.open(AddEditPageComponent, modalOptions);
    
    if (action == 'add') {
      modalRef.componentInstance.url = this.url;
    } 
    if (action == 'edit') {
      modalRef.componentInstance.url = this.url+slug+'/';
    }

    modalRef.componentInstance.routeType = this.routeType;
    modalRef.componentInstance.addOrEdit = action;

    // modalRef.result.then((result) => {
    //   if (result) {
    //     console.log('modalRef result:', result);
    //   }
    // });
  }

  clicky() {
    console.log('list:', this.list);
  }

  populateFieldsArray() {
    switch (this.routeType) {
      case 'department':
      case 'division':
      case 'project':
        this.columns = ['name', 'description', 'manager', 'deputy', 'assistant'];
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
