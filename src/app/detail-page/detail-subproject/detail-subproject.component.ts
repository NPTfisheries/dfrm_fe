import { Component, OnInit, OnChanges, ViewChild, Input, SimpleChanges, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormContainerComponent } from 'src/app/forms/form-container/form-container.component';

import { AuthService } from 'src/_services/auth.service';
import { BackendService } from 'src/_services/backend.service';

import { getRecordBySlug } from 'src/_utilities/getRecordBySlug';
import { managerAccess } from 'src/_utilities/permission-util';

@Component({
  selector: 'app-detail-subproject',
  templateUrl: './detail-subproject.component.html',
  styleUrls: ['./detail-subproject.component.css']
})
export class DetailSubprojectComponent implements OnInit, OnChanges {

  @Input() projectId: number | undefined;

  data: any | undefined;

  addSubproject: boolean = false;
  managerPerms: boolean = false;
  subprojectPerms: any;

  constructor(
    private authService: AuthService,
    private backendService: BackendService,
    private modalService: NgbModal,
  ) {  }

  ngOnInit(): void {
    this.checkPermissions();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['projectId'] && !changes['projectId'].isFirstChange()) {
      this.getList();
      this.checkPermissions();
    }
  }

  checkPermissions() {
    this.authService.permissionGroup$.subscribe((permGroup:string) => {
      this.managerPerms = managerAccess(permGroup);
    });
    this.authService.projectPerms$.subscribe((projectPerms:any) => {
      this.addSubproject = projectPerms.includes(String(this.projectId));
    });
    this.authService.subprojectPerms$.subscribe((subprojectPerms:any) => {
      this.subprojectPerms = subprojectPerms;
    });
  }

  getList() {
    this.backendService.getList(`subproject/?project_id=${this.projectId}`).subscribe(list => {
      this.data = list;
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
    modalRef.componentInstance.context = this;
    modalRef.componentInstance.routeType = 'subproject';
    modalRef.componentInstance.projectId = this.projectId; // needed for filtered list response from FCC
    modalRef.componentInstance.data = newData;

    modalRef.result.then(() => {
      this.authService.refreshPermissions().subscribe();
    });
  }

  edit(slug: string) {
    console.log('edit: subproject', slug);

    const data = getRecordBySlug(this.data, slug);
    // console.log('passing this:', data)


    const modalRef = this.modalService.open(FormContainerComponent, { size: 'xl', });
    modalRef.componentInstance.context = this;
    modalRef.componentInstance.routeType = 'subproject';
    modalRef.componentInstance.data = data;
    modalRef.componentInstance.projectId = this.projectId; // needed for filtered list response from FCC
    modalRef.componentInstance.slug = slug;
  }

  canEditSubproject(id:any) {
    return this.subprojectPerms.includes(String(id));
  }

}
