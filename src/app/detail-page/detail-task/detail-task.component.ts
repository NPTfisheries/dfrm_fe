import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormContainerComponent } from 'src/app/forms/form-container/form-container.component';
import { Subscription } from 'rxjs';

import { AuthService } from 'src/_services/auth.service';
import { BackendService } from 'src/_services/backend.service';

import { getRecordBySlug } from 'src/_utilities/getRecordBySlug';
import { professionalAccess } from 'src/_utilities/permission-util';

@Component({
  selector: 'app-detail-task',
  templateUrl: './detail-task.component.html',
  styleUrls: ['./detail-task.component.css']
})
export class DetailTaskComponent implements OnInit, OnChanges {

  @Input() subprojectId: number | undefined;

  professionalAccess = professionalAccess;

  data: any | undefined;
  permissionGroup!: string;
  private permissionGroupSubscription: Subscription;

  constructor(
    private authService: AuthService,
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
      this.data = list;
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

    modalRef.componentInstance.context = this;
    modalRef.componentInstance.routeType = 'task';
    modalRef.componentInstance.data = newData;
    modalRef.componentInstance.subprojectId = this.subprojectId; // needed for filtered list response from FCC
    
 
  }

  edit(slug: string) {
    console.log('edit: task', slug);

    const data = getRecordBySlug(this.data, slug);

    const modalRef = this.modalService.open(FormContainerComponent, { size: 'xl', });

    modalRef.componentInstance.context = this;
    modalRef.componentInstance.routeType = 'task';
    modalRef.componentInstance.data = data;
    modalRef.componentInstance.subprojectId = this.subprojectId; // needed for filtered list response from FCC
    modalRef.componentInstance.data = slug;
  }

}
