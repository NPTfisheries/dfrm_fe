import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/_services/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, ColGroupDef, GridApi } from 'ag-grid-community';

import { FormContainerComponent } from '../forms/form-container/form-container.component';
import { DocumentUploadComponent } from '../forms/document-upload/document-upload.component';
import { getColumnDefs } from 'src/_services/columnDef.service';
import { professionalAccess } from 'src/_utilities/permission-util';
import { DocumentService } from 'src/_services/document.service';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html'
})
export class DocumentsComponent implements OnInit {
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;
  @ViewChild(FormContainerComponent) formContainerComponent!: FormContainerComponent;
  @ViewChild(DocumentUploadComponent) documentUploadComponent!: DocumentUploadComponent;

  private gridApi: GridApi | undefined;
  professionalAccess=professionalAccess;
  routeType: string = 'document';

  defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    // flex: 1,
    resizable: true,
    cellStyle: { fontSize: '12px' },
  };

  data!: any[];
  columnDefs: (ColDef | ColGroupDef)[] = [];
  permissionGroup!: string;
  private permissionGroupSubscription: Subscription;

  constructor(
    private authService: AuthService,
    private documentService: DocumentService,
    private modalService: NgbModal,
  ) {
    this.permissionGroupSubscription = this.authService.permissionGroup$.subscribe(group => {
      this.permissionGroup = group;
      this.columnDefs = getColumnDefs(this.routeType, this);
    });
  }

  onGridReady(params: any) {
    this.getList();
    this.gridApi = params.api;
    params.api.sizeColumnsToFit(params);
  }
  
  ngOnInit(): void {
    this.columnDefs = getColumnDefs(this.routeType, this);
  }

  ngOnDestroy(): void {
    this.permissionGroupSubscription.unsubscribe();
  }

  getList() {
    this.documentService.getDocuments().subscribe((documents: any) => {
        this.data = documents;
    });
  }  

  refreshList() {
    this.documentService.refreshDocuments().subscribe((documents: any) => {
        this.data = documents;
    });
  }  

  uploadDocument() {
    console.log('button clicked');
    const modalRef = this.modalService.open(DocumentUploadComponent, { size: 'xl', });
    modalRef.componentInstance.context = this;
    
    modalRef.result.then(() => {
      this.authService.refreshPermissions().subscribe();
      this.refreshList();
    });
  }

}
