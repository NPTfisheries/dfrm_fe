import { Component, OnInit, OnChanges, ViewChild, Input, SimpleChanges } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormContainerComponent } from 'src/app/forms/form-container/form-container.component';
import { Subscription } from 'rxjs';

import { AuthService } from 'src/_services/auth.service';
import { AlertService } from 'src/_services/alert.service';
import { BackendService } from 'src/_services/backend.service';

import { professionalAccess } from 'src/_utilities/permission-util';

@Component({
  selector: 'app-detail-task',
  templateUrl: './detail-task.component.html',
  styleUrls: ['./detail-task.component.css']
})
export class DetailTaskComponent implements OnInit, OnChanges {

  @Input() subprojectId: number | undefined;
  @ViewChild(FormContainerComponent) formContainerComponent!: FormContainerComponent;

  professionalAccess = professionalAccess;

  list: any | undefined;
  permissionGroup!: string;
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
    this.getList();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['subprojectId'] && !changes['subprojectId'].isFirstChange()) {
      this.getList();
    }
  }

  ngOnDestroy(): void {
    this.permissionGroupSubscription.unsubscribe();
  }


  getList() {
    this.backendService.getList(`task/?subproject_id=${this.subprojectId}`).subscribe(list => {
      this.list = list;
    });
  }

  add() {
    console.log('adding subproject');

    const newData = {
      name: '',
      description: '',
      subproject: this.subprojectId,
      supervisor: '',
      img_banner: '',
      img_card: '',
    }

    const modalRef = this.modalService.open(FormContainerComponent, { size: 'xl', });

    modalRef.componentInstance.routeType = 'task';
    modalRef.componentInstance.subprojectId = this.subprojectId; // needed for filtered list response from FCC
    modalRef.componentInstance.data = newData;

    modalRef.result.then((result) => {
      modalRef.componentInstance.updateList.subscribe((newList: any) => {
        this.list = newList;
        this.alertService.success(`New task created!`, { autoClose: true });
      });
    }).catch((reason) => { }); // prevents error on exiting modal by clicking outside
  }

  edit(slug: string) {
    console.log('edit: task', slug);

    const data = this.getRecordBySlug(slug);

    const modalRef = this.modalService.open(FormContainerComponent, { size: 'xl', });

    modalRef.componentInstance.routeType = 'task';
    modalRef.componentInstance.slug = slug;
    modalRef.componentInstance.subprojectId = this.subprojectId; // needed for filtered list response from FCC
    modalRef.componentInstance.data = data;

    modalRef.result.then((result) => {
      modalRef.componentInstance.updateList.subscribe((newList: any) => {
        this.list = newList;
        this.alertService.success(`Edit task successful!`, { autoClose: true });
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
