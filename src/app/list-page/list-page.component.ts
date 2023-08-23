import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';

import { AlertService } from 'src/_services/alert.service';
import { BackendService } from 'src/_services/backend.service';
import { RegisterComponent } from '../forms/register/register.component';
import { ImageUploadComponent } from '../forms/image-upload/image-upload.component';

import { FormContainerComponent } from '../forms/form-container/form-container.component';

import { getRouteType } from 'src/_utilities/route-utils';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.css']
})
export class ListPageComponent implements OnInit {

  @ViewChild(FormContainerComponent) formContainerComponent!: FormContainerComponent;
  @ViewChild(RegisterComponent) registerComponent!: RegisterComponent;

  routeType: string | undefined;
  list: any | undefined;
  columns: string[] = [];
  url: string = '';

  constructor(
    private route: ActivatedRoute,
    private backendService: BackendService,
    private alertService: AlertService,
    private modalService: NgbModal,
  ) { }

  showlist() {
    console.log(this.list);
  }

  ngOnInit(): void {
    this.routeType = getRouteType(this.route);
    this.getList(this.routeType);
    console.log('route', this.route);
  }

  getList(routeType: string) {
    this.backendService.getList(routeType).subscribe(list => {
      this.list = list;
    });
  }

  // updateList() {
  //   this.getList(this.routeType);
  // }

  // add & edit for department, division, and project
  add(routeType: string | undefined) {
    console.log('add:', routeType);
    const modalOptions: NgbModalOptions = { size: 'xl', };

    const modalRef = this.modalService.open(FormContainerComponent, modalOptions);

    modalRef.componentInstance.routeType = routeType;
    modalRef.componentInstance.url = this.url;
    modalRef.componentInstance.addOrEdit = 'add';
  }

  edit(routeType: string | undefined, id: any) {
    console.log('edit:', routeType, id);

    const data = this.getRecordById(id);

    const modalOptions: NgbModalOptions = { size: 'xl', };

    const modalRef = this.modalService.open(FormContainerComponent, modalOptions);

    modalRef.componentInstance.routeType = routeType;
    modalRef.componentInstance.data = data;
    modalRef.componentInstance.url = this.url + data.slug + '/';
    modalRef.componentInstance.addOrEdit = 'edit';
  }

  uploadImage() {
    const modalOptions: NgbModalOptions = { size: 'xl', };

    const modalRef = this.modalService.open(ImageUploadComponent, modalOptions);

    modalRef.result.then((result) => {
      console.log(result);
      // this.updateList();
      this.alertService.success(`Image uploaded!`, { autoClose: true });
    }).catch((reason) => { }); // prevents error on exiting modal by clicking outside.
  }


  registerUser() {
    const modalOptions: NgbModalOptions = { size: 'xl', };

    const modalRef = this.modalService.open(RegisterComponent, modalOptions);

    modalRef.result.then((result) => {
      modalRef.componentInstance.newList.subscribe((newList: any) => {
        this.list = newList;
        this.alertService.success(`New user registered!`, { autoClose: true });
      });
    }).catch((reason) => { }); // prevents error on exiting modal by clicking outside.
  }

  populateFieldsArray(routeType: string) {
    switch (routeType) {
      case 'department':
      case 'division':
        this.columns = ['name', 'description', 'manager', 'deputy', 'assistant', 'staff'];
        break;
      case 'project':
        this.columns = ['name', 'description', 'project leaders'];
        break;
      case 'subproject':
        this.columns = ['name', 'description', 'project', 'lead'];
        break;
      case 'task':
        this.columns = ['name', 'description', 'subproject', 'supervisor'];
        break;
      case 'users':
        this.columns = ['name', 'email', 'work_phone', 'mobile_phone', 'title'];
        break;
      case 'image':
        this.columns = ['name', 'description', 'photographer', 'photo_date', 'source'];
        break;
      default:
        this.columns = [];
        break;
    }
  }

  getRecordById(id: number) {
    for (let item of this.list) {
      if (item.id === id) {
        console.log('returning', item);
        return item;
      }
    }
  }

}
