import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';

import { AgGridAngular } from 'ag-grid-angular';
import { GridApi, ColumnApi, ColDef } from 'ag-grid-community';
import { getColumnDefs } from 'src/_services/columnDef.service';
import { LinkButtonRendererComponent } from 'src/_renderers/link-button-renderer/link-button-renderer.component';
import { EditButtonRendererComponent } from 'src/_renderers/edit-button-renderer/edit-button-renderer.component';

import { AuthService } from 'src/_services/auth.service';
import { BackendService } from 'src/_services/backend.service';
import { RegisterComponent } from '../forms/register/register.component';
import { ImageUploadComponent } from '../forms/image-upload/image-upload.component';
import { Subscription } from 'rxjs';

import { FormContainerComponent } from '../forms/form-container/form-container.component';

import { getRouteType } from 'src/_utilities/route-utils';
import { adminAccess, managerAccess, projectleaderAccess } from 'src/_utilities/permission-util';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.css']
})
export class ListPageComponent implements OnInit {

  @ViewChild(FormContainerComponent) formContainerComponent!: FormContainerComponent;
  @ViewChild(RegisterComponent) registerComponent!: RegisterComponent;
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;


  private gridApi = GridApi;
  private gridColumnApi = ColumnApi;
  columnDefs: ColDef[] | undefined;
  frameworkComponents: any = {
    linkButtonRenderer: LinkButtonRendererComponent,
    editButtonRenderer: EditButtonRendererComponent,
  };

  // default settings for all columns.
  defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    resizable: true,
    cellStyle: { fontSize: '20px' },
    // cellDataType: false,
  };

  data!: any[];

  adminAccess = adminAccess;
  managerAccess = managerAccess;
  projectleaderAccess = projectleaderAccess;
  routeType!: string;

  permissionGroup!: string;
  private permissionGroupSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private backendService: BackendService,
    private modalService: NgbModal,

  ) {
    this.permissionGroupSubscription = this.authService.permissionGroup$.subscribe(group => {
      this.permissionGroup = group;
    });
  }

  onGridReady(params: any) {
    this.getList(this.routeType);
    this.gridApi = params.api;
    params.api.sizeColumnsToFit(params);
    // params.api.autoSizeAllColumns();
  }

  ngOnInit(): void {
    this.routeType = getRouteType(this.route);
    this.columnDefs = getColumnDefs(this.routeType, this);
  }

  ngOnDestroy(): void {
    this.permissionGroupSubscription.unsubscribe();
  }

  getList(routeType: string) {
    this.backendService.getList(routeType).subscribe((list: any) => {
      if (routeType === 'facility') { 
        this.data = list.features;
        // console.log(list.features);
      }
      else {
        this.data = list;
      }
    });
  }

  // add & edit for department, division, and project
  add(routeType: string | undefined) {
    // console.log('add:', routeType);

    const modalRef = this.modalService.open(FormContainerComponent, this.getModalOptions());
    modalRef.componentInstance.context = this;
    modalRef.componentInstance.routeType = routeType;
    modalRef.componentInstance.addOrEdit = 'add'

    modalRef.result.then(() => {
      this.authService.refreshPermissions().subscribe();
    });
  }

  uploadImage() {
    const modalRef = this.modalService.open(ImageUploadComponent, this.getModalOptions());
    modalRef.componentInstance.context = this;
  }

  registerUser() {
    const modalRef = this.modalService.open(RegisterComponent, this.getModalOptions());
    modalRef.componentInstance.context = this;
  }

  getModalOptions(): NgbModalOptions {
    return { size: 'xl', };
  }

}
