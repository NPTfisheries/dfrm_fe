import { Component, OnInit, OnChanges, ViewChild, Input, SimpleChanges, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormContainerComponent } from 'src/app/forms/form-container/form-container.component';

import { AuthService } from 'src/_services/auth.service';
import { getRecordById } from 'src/_utilities/getRecordById';
import { buildImageUrl } from 'src/_utilities/buildImageUrl';
import { managerAccess } from 'src/_utilities/permission-util';
import { SubprojectService } from 'src/_services/subproject.service';

@Component({
  selector: 'app-detail-subproject',
  templateUrl: './detail-subproject.component.html',
  styleUrls: ['./detail-subproject.component.css']
})
export class DetailSubprojectComponent implements OnInit, OnChanges {

  @Input() projectId!: number;

  data: any | undefined;

  addSubproject: boolean = false;
  managerPerms: boolean = false;
  subprojectPerms: any;

  constructor(
    private authService: AuthService,
    private subprojectService: SubprojectService,
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    console.log("subprojectdetailinit");
    this.checkPermissions();
    this.getList();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['projectId'] && !changes['projectId'].isFirstChange()) {
      this.getList();
      this.checkPermissions();
    }
  }

  checkPermissions() {
    this.authService.permissionGroup$.subscribe((permGroup: string) => {
      this.managerPerms = managerAccess(permGroup);
    });
    this.authService.projectPerms$.subscribe((projectPerms: any) => {
      this.addSubproject = projectPerms.includes(String(this.projectId));
    });
    this.authService.subprojectPerms$.subscribe((subprojectPerms: any) => {
      this.subprojectPerms = subprojectPerms;
    });
  }

  getImageUrl(imagePath: string) {
    return buildImageUrl(imagePath);
  }

  getList() {
    this.subprojectService.getSubprojectsByProjectId(this.projectId).subscribe(subprojects => {
      this.data = subprojects;
    });
  }
  
  refreshList() {
    this.subprojectService.refreshSubprojectsByProjectId(this.projectId).subscribe(subprojects => {
      this.data = subprojects;
    });
  }

  add() {
    const newData = {
      name: '',
      description: '',
      project: this.projectId,
      lead: '',
      img_banner: '',
      img_card: '',
      division: { id: '' }
    }

    const modalRef = this.modalService.open(FormContainerComponent, { size: 'xl', });
    modalRef.componentInstance.context = this;
    modalRef.componentInstance.routeType = 'subproject';
    modalRef.componentInstance.projectId = this.projectId; // needed for filtered list response from FCC
    modalRef.componentInstance.data = newData;
    modalRef.componentInstance.addOrEdit = 'add';

    modalRef.result.then(() => {
      this.authService.refreshPermissions().subscribe();
    });
  }

  edit(id: string) {
    // subproject uses id
    console.log('edit: subproject', id);

    const data = getRecordById(this.data, id);

    const modalRef = this.modalService.open(FormContainerComponent, { size: 'xl', });
    modalRef.componentInstance.context = this;
    modalRef.componentInstance.routeType = 'subproject';
    modalRef.componentInstance.data = data;
    modalRef.componentInstance.projectId = this.projectId; // needed for filtered list response from FCC
    modalRef.componentInstance.identifier = id;
    modalRef.componentInstance.addOrEdit = 'edit';

    modalRef.result.then(() => {
      this.authService.refreshPermissions().subscribe();
      this.refreshList();
    });
  }

  canEditSubproject(id: any) {
    return this.subprojectPerms.includes(String(id));
  }

}
