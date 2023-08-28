import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';

import { AuthService } from 'src/_services/auth.service';
import { AlertService } from 'src/_services/alert.service';
import { BackendService } from 'src/_services/backend.service';
import { RegisterComponent } from '../forms/register/register.component';
import { ImageUploadComponent } from '../forms/image-upload/image-upload.component';

import { FormContainerComponent } from '../forms/form-container/form-container.component';

import { getRouteType } from 'src/_utilities/route-utils';
import { managerAccess, professionalAccess } from 'src/_utilities/permission-util';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.css']
})
export class ListPageComponent implements OnInit {

  @ViewChild(FormContainerComponent) formContainerComponent!: FormContainerComponent;
  @ViewChild(RegisterComponent) registerComponent!: RegisterComponent;

  managerAccess = managerAccess;
  professionalAccess = professionalAccess;
  routeType: string | undefined;
  list: any | undefined;
  columns: string[] = [];
  // url: string = '';
  permissionGroup!: string;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
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
    this.populateFieldsArray(this.routeType);
    this.permissionGroup = this.authService.getPermissionGroup();
  }

  getList(routeType: string) {
    this.backendService.getList(routeType).subscribe(list => {
      this.list = list;
    });
  }

  // add & edit for department, division, and project
  add(routeType: string | undefined) {
    console.log('add:', routeType);

    const modalRef = this.modalService.open(FormContainerComponent, this.getModalOptions());

    modalRef.componentInstance.routeType = routeType;

    modalRef.result.then((result) => {
      modalRef.componentInstance.updateList.subscribe((newList: any) => {
        this.list = newList;
        this.alertService.success(`New ${this.routeType} created!`, { autoClose: true });
      });
    }).catch((reason) => { }); // prevents error on exiting modal by clicking outside.
  }

  edit(routeType: string, slug: string ) {
    console.log('edit:', routeType, slug);

    const data = this.getRecordBySlug(routeType, slug);

    const modalRef = this.modalService.open(FormContainerComponent, this.getModalOptions());

    modalRef.componentInstance.routeType = routeType;
    modalRef.componentInstance.slug = slug;
    modalRef.componentInstance.data = data;

    modalRef.result.then((result) => {
      modalRef.componentInstance.updateList.subscribe((newList: any) => {
        this.list = newList;
        this.alertService.success(`Edit ${this.routeType} successful!`, { autoClose: true });
      });
    }).catch((reason) => { }); // prevents error on exiting modal by clicking outside.
  }

  uploadImage() {
    const modalRef = this.modalService.open(ImageUploadComponent, this.getModalOptions());

    modalRef.result.then((result) => {
      modalRef.componentInstance.updateList.subscribe((newList: any) => {
        this.list = newList;
        this.alertService.success(`Image uploaded!`, { autoClose: true });
      });
    }).catch((reason) => { }); // prevents error on exiting modal by clicking outside.
  }


  registerUser() {
    const modalRef = this.modalService.open(RegisterComponent, this.getModalOptions());

    modalRef.result.then((result) => {
      modalRef.componentInstance.updateList.subscribe((newList: any) => {
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
      // case 'subproject':
      //   this.columns = ['name', 'description', 'project', 'lead'];
      //   break;
      // case 'task':
      //   this.columns = ['name', 'description', 'subproject', 'supervisor'];
      //   break;
      case 'users':
        this.columns = ['name', 'email', 'work phone', 'mobile phone', 'title'];
        break;
      case 'image':
        this.columns = ['name', 'description', 'photographer', 'photo date', 'source'];
        break;
      default:
        this.columns = [];
        break;
    }
  }

  getRecordBySlug(routeType:string, slug: string) {
    if (!this.list) { return; }

    // if (routeType === 'users') {
    //   // users is queried via ID, where everything else is slug. (routing and api calls). This works
    //   for (let item of this.list) {
    //     if (item.id === slug) {
    //       return item;
    //     }
    //   }
    // } else {
      for (let item of this.list) {
        if (item.slug === slug) {
          return item;
        }
      }
    // }
  }

  getRecordById(id: number) {
    if (!this.list) { return; }

    for (let item of this.list) {
      if (item.id === id) {
        return item;
      }
    }
  }

  getModalOptions(): NgbModalOptions {
    return {
      size: 'xl',
    };
  }

}
