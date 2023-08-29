import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';

import { AgGridAngular } from 'ag-grid-angular';
import { GridReadyEvent } from 'ag-grid-community';
import { ColDef } from 'ag-grid-community';
import { Observable } from 'rxjs';

import { AuthService } from 'src/_services/auth.service';
import { AlertService } from 'src/_services/alert.service';
import { BackendService } from 'src/_services/backend.service';
import { RegisterComponent } from '../forms/register/register.component';
import { ImageUploadComponent } from '../forms/image-upload/image-upload.component';
import { Subscription } from 'rxjs';

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

  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;


  columnDefs: ColDef[] | undefined;

  // rowData = [
  //   { name: 'Toyota', email: 'Celica', work_phone: 35000, mobile_phone: 10392, title:'pig' }
  // ];

  defaultColDef: ColDef = {
    sortable: true,
    filter: true,
  };

  rowData!: any[];

  onGridReady(params: GridReadyEvent) {
    this.getList(this.routeType);
  }

  managerAccess = managerAccess;
  professionalAccess = professionalAccess;
  // routeType: string | undefined;
  routeType!: string;

  list: any | undefined;
  columns: string[] = [];
  permissionGroup!: string;
  private permissionGroupSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private backendService: BackendService,
    private alertService: AlertService,
    private modalService: NgbModal,
  ) {
    this.permissionGroupSubscription = this.authService.permissionGroup$.subscribe(group => {
      this.permissionGroup = group;
    });
  }

  showlist() {
    console.log(this.list);
  }

  ngOnInit(): void {
    this.routeType = getRouteType(this.route);
    this.getList(this.routeType);
    this.populateFieldsArray(this.routeType);

    this.columnDefs = this.getColumnDefs(this.routeType);
  }

  ngOnDestroy(): void {
    this.permissionGroupSubscription.unsubscribe();
  }

  getList(routeType: string) {
    this.backendService.getList(routeType).subscribe((list: any) => {
      this.list = list;
      this.rowData = list;
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

  edit(routeType: string, slug: string) {
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
        this.columns =  ['name', 'description', 'manager', 'deputy', 'assistant', 'staff'];
        break;
      case 'project':
        this.columns =  ['name', 'description', 'project leaders'];
        break;
      case 'users':
        this.columns =  ['name', 'email', 'work phone', 'mobile phone', 'title'];
        break;
      case 'image':
        this.columns =  ['name', 'description', 'photographer', 'photo date', 'source'];
        break;
      default:
        this.columns = [];
        return;
    }
  }

  private transformArray(inputArray: string[]): ColDef[] {
    return inputArray.map(item => ({ field: item }));
  }

  getColumnDefs(routeType: string) {
    switch (routeType) {
      case 'department':
      case 'division':
        return this.transformArray(['name', 'description', 'manager', 'deputy', 'assistant', 'staff']);
      case 'project':
        return this.transformArray(['name', 'description', 'project leaders']);
      case 'users':
        return this.transformArray(['first_name', 'last_name', 'email', 'work phone', 'mobile phone', 'title']);
        // return this.transformArray(['name', 'email', 'work phone', 'mobile phone', 'title']);
      case 'image':
        return this.transformArray(['name', 'description', 'photographer', 'photo date', 'source']);
      default:
        return;
    }
  }

  getRecordBySlug(routeType: string, slug: string) {
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
