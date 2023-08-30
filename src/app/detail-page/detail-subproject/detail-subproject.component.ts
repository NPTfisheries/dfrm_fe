import { Component, OnInit, OnChanges, ViewChild, Input, SimpleChanges, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormContainerComponent } from 'src/app/forms/form-container/form-container.component';
import { Subscription } from 'rxjs';

import { AuthService } from 'src/_services/auth.service';
import { AlertService } from 'src/_services/alert.service';
import { BackendService } from 'src/_services/backend.service';

import { professionalAccess } from 'src/_utilities/permission-util';

@Component({
  selector: 'app-detail-subproject',
  templateUrl: './detail-subproject.component.html',
  styleUrls: ['./detail-subproject.component.css']
})
export class DetailSubprojectComponent implements OnInit, OnChanges {

  @Input() projectId: number | undefined;
  @ViewChild(FormContainerComponent) formContainerComponent!: FormContainerComponent;

  professionalAccess = professionalAccess;

  permissionGroup!: string;
  routeType = 'subproject';
  list: any | undefined;
  private permissionGroupSubscription: Subscription;

  constructor(
    private authService: AuthService,
    private alertService: AlertService,
    private backendService: BackendService,
    private modalService: NgbModal,
  ) { 
    this.permissionGroupSubscription = this.authService.permissionGroup$.subscribe(group => {
      this.permissionGroup = group;
    });
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['projectId'] && !changes['projectId'].isFirstChange()) {
      this.getList();
    }
  }
  
  ngOnDestroy(): void {
    this.permissionGroupSubscription.unsubscribe();
  }

  getList() {
    this.backendService.getList(`subproject/?project_id=${this.projectId}`).subscribe(list => {
      this.list = list;
    });
  }

  add() {
    console.log('adding subproject');

    const newData = {
      name: '',
      description: '',
      project: this.projectId,
      lead: '',
      img_banner: '',
      img_card: '',
    }

    const modalRef = this.modalService.open(FormContainerComponent, { size: 'xl', });

    modalRef.componentInstance.routeType = 'subproject';
    modalRef.componentInstance.projectId = this.projectId; // needed for filtered list response from FCC
    modalRef.componentInstance.data = newData;
    modalRef.componentInstance.listContext = this;

    modalRef.result.then((result) => {
      modalRef.componentInstance.updateList.subscribe((newList: any) => {
        this.list = newList;
        this.alertService.success(`New subproject created!`, { autoClose: true });
      });
    }).catch((reason) => { }); // prevents error on exiting modal by clicking outside
  }

  edit(slug: string) {
    console.log('edit: subproject', slug);

    const data = this.getRecordBySlug(slug);

    const modalRef = this.modalService.open(FormContainerComponent, { size: 'xl', });

    modalRef.componentInstance.routeType = 'subproject';
    modalRef.componentInstance.slug = slug;
    modalRef.componentInstance.projectId = this.projectId; // needed for filtered list response from FCC
    modalRef.componentInstance.data = data;

    modalRef.result.then((result) => {
      modalRef.componentInstance.updateList.subscribe((newList: any) => {
        this.list = newList;
        this.alertService.success(`Edit subproject successful!`, { autoClose: true });
      });
    }).catch((reason) => { }); // prevents error on exiting modal by clicking outside.
  }

  getRecordBySlug(slug: string) {
    if (!this.list) { return; }
    for (let item of this.list) {
      if (item.slug === slug) {
        return item;
      }
    }
  }
}
