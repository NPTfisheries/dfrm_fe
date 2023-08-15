import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';

import { AlertService } from 'src/_services/alert.service';
import { BackendService } from 'src/_services/backend.service';
import { AddEditPageComponent } from '../add-edit-page/add-edit-page.component';
import { RegisterComponent } from '../register/register.component';

type Action = 'add' | 'edit';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.css']
})
export class ListPageComponent implements OnInit {

  @ViewChild(AddEditPageComponent) addEditComponent!: AddEditPageComponent;

  routeType: string | undefined;
  list: any | undefined;
  columns: string[] = [];
  url: string = '';

  constructor(
    private route: ActivatedRoute,
    private backendService: BackendService,
    private alertService: AlertService,
    private modalService: NgbModal,
    private cdRef: ChangeDetectorRef
  ) { }


  ngOnInit(): void {
    // this.route.url.subscribe(urlSegments => {
    //   if (urlSegments.length > 0) {
    //     this.routeType = urlSegments[0].path;
    //     this.populateFieldsArray();
    //     this.url = '/api/v1/' + this.routeType + '/';
    //   }

    //   this.backendService.get(this.url).subscribe(list => {
    //     this.list = list;
    //   });

    // });
    this.getList();
  }

  getList() {
    this.route.url.subscribe(params => {
      this.routeType = params[0].path;
      this.url = `/api/v1/${this.routeType}/`;
      this.populateFieldsArray(this.routeType);

      this.backendService.get(this.url).subscribe(response => {
        console.log(response);
        this.list = response;
      });

    });
  }

  addOrEdit(action: Action, slug: string|undefined) {
    const modalOptions: NgbModalOptions = {
      size: 'xl',
        };
      
    const modalRef = this.modalService.open(AddEditPageComponent, modalOptions);
    
    if (action == 'add') { modalRef.componentInstance.url = this.url; } 
    if (action == 'edit') { modalRef.componentInstance.url = this.url+slug+'/'; }

    modalRef.componentInstance.routeType = this.routeType;
    modalRef.componentInstance.addOrEdit = action;

    modalRef.result.then((result) => {
      console.log('modal result:', result);
      if (result === 'success') {
        console.log('modalRef result:', result);
        this.refreshListData();
        this.alertService.success(`${this.routeType} added/edited.`, { autoClose: true });
      }
    }).catch((reason) => { }); // prevents error on exiting modal by clicking outside.
  }
  
  registerUser() {
    console.log('reg user"');
    const modalOptions: NgbModalOptions = {
      size: 'xl',
        };
      
    const modalRef = this.modalService.open(RegisterComponent, modalOptions);

    modalRef.result.then((result) => {
      console.log(result);
      if (result === 'success') {
        
      }
    }).catch((reason) => { }); // prevents error on exiting modal by clicking outside.
  }

  refreshListData() {
    this.backendService.get(this.url).subscribe(list => {
      this.list = list;
      this.cdRef.detectChanges();
    });
  }
  
  populateFieldsArray(routeType: string) {
    switch (routeType) {
      case 'department':
        this.columns = ['name', 'description', 'manager', 'deputy', 'assistant', 'staff'];
        break;
      case 'division':
        this.columns = ['name', 'description', 'manager', 'deputy', 'assistant', 'department'];
        break;
      case 'project':
        this.columns = ['name', 'description', 'manager', 'deputy', 'assistant'];
        break;
      case 'users':
        this.columns = ['name', 'email', 'work_phone', 'mobile_phone', 'title'];
        break;
      default:
        this.columns = [];
        break;
    }
  }

}
