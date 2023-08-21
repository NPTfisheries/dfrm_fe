import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';

import { AlertService } from 'src/_services/alert.service';
import { BackendService } from 'src/_services/backend.service';
import { AddEditPageComponent } from '../add-edit-page/add-edit-page.component';
import { RegisterComponent } from '../forms/register/register.component';
import { ImageUploadComponent } from '../forms/image-upload/image-upload.component';

import { DynamicFormComponent } from '../dynamic-form/dynamic-form.component';
import { ProjectFormComponent } from '../forms/project-form/project-form.component';
import { DepartmentFormComponent } from '../forms/department-form/department-form.component';
import { DivisionFormComponent } from '../forms/division-form/division-form.component';
import { FormContainerComponent } from 'src/_forms/form-container/form-container.component';

type Action = 'add' | 'edit';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.css']
})
export class ListPageComponent implements OnInit {

  @ViewChild(DepartmentFormComponent) departmentFormComponent!: DepartmentFormComponent;
  @ViewChild(DivisionFormComponent) divisionFormComponent!: DivisionFormComponent;
  @ViewChild(ProjectFormComponent) projectFormComponent!: ProjectFormComponent;

  @ViewChild(FormContainerComponent) formContainerComponent!: FormContainerComponent;



  @ViewChild(AddEditPageComponent) addEditComponent!: AddEditPageComponent;
  @ViewChild(RegisterComponent) registerComponent!: AddEditPageComponent;

  routeType: string | undefined;
  list: any | undefined;
  columns: string[] = [];
  url: string = '';

  constructor(
    private route: ActivatedRoute,
    private backendService: BackendService,
    private alertService: AlertService,
    private modalService: NgbModal,
    // private cdRef: ChangeDetectorRef
  ) { }


  ngOnInit(): void {
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

  updateList() {
    this.getList();
  }

  addOrEdit(action: Action, slug: string | undefined, detailSlug?: string | undefined) {
    const modalOptions: NgbModalOptions = {
      size: 'xl',
    };

    let modalRef: any = undefined;

    switch (slug) {
      // case 'department':
      //   modalRef = this.modalService.open(DepartmentFormComponent, modalOptions);
      //   break;
      // case 'division':
      //   modalRef = this.modalService.open(DivisionFormComponent, modalOptions);
      //   break;
      // case 'project':
      //   modalRef = this.modalService.open(ProjectFormComponent, modalOptions);
      //   break;
      default:
        // modalRef = this.modalService.open(AddEditPageComponent, modalOptions);
        modalRef = this.modalService.open(FormContainerComponent, modalOptions);
    }

    if (action == 'add') { modalRef.componentInstance.url = this.url; }
    if (action == 'edit') { modalRef.componentInstance.url = this.url + detailSlug + '/'; }

    modalRef.componentInstance.routeType = this.routeType;
    modalRef.componentInstance.addOrEdit = action;

    modalRef.result.then((result: any) => {
      this.updateList(); // regardless of result, re-populate list. Maybe not the most efficient, but effective?
      console.log('modal result:', result);
      if (result === 'success') {
        console.log('modalRef result:', result);
        this.alertService.success(`${this.routeType} added/edited.`, { autoClose: true });
      }
    }).catch((reason: any) => { }); // prevents error on exiting modal by clicking outside.
  }

  // add & edit for department, division, and project
  add(routeType: string | undefined) {
    console.log('add:', routeType);
    const modalOptions: NgbModalOptions = {
      size: 'xl',
    };

    const modalRef = this.modalService.open(FormContainerComponent, modalOptions);

    modalRef.componentInstance.routeType = routeType;
    
  }

  edit(routeType: string | undefined, slug: string | undefined) {
    console.log('edit:', routeType, slug);
    const data = this.backendService.get('/api/v1/' + routeType + '/' + slug + '/').subscribe(data => {
      console.log('edit form data:', data);
      return data;
    });

    const modalOptions: NgbModalOptions = {
      size: 'xl',
    };

    const modalRef = this.modalService.open(FormContainerComponent, modalOptions);

    modalRef.componentInstance.routeType = this.routeType;
    modalRef.componentInstance.data = data;
  }

  uploadImage() {
    const modalOptions: NgbModalOptions = {
      size: 'xl',
    };

    const modalRef = this.modalService.open(ImageUploadComponent, modalOptions);

    modalRef.result.then((result) => {
      console.log(result);
      this.updateList();
      this.alertService.success(`Image uploaded!`, { autoClose: true });
    }).catch((reason) => { }); // prevents error on exiting modal by clicking outside.
  }

  registerUser() {
    const modalOptions: NgbModalOptions = {
      size: 'xl',
    };

    const modalRef = this.modalService.open(RegisterComponent, modalOptions);

    modalRef.result.then((result) => {
      console.log(result);
      if (result === 'success') {
        this.updateList();
        this.alertService.success(`New user registered!`, { autoClose: true });
      }
    }).catch((reason) => { }); // prevents error on exiting modal by clicking outside.
  }


  populateFieldsArray(routeType: string) {
    switch (routeType) {
      case 'department':
      case 'division':
        this.columns = ['name', 'description', 'manager', 'deputy', 'assistant', 'staff'];
        break;
      case 'project':
        this.columns = ['name', 'description', 'Project Leaders'];
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

}
