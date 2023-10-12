import { Component, OnInit, OnChanges, ViewChild, Input, SimpleChanges, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormContainerComponent } from 'src/app/forms/form-container/form-container.component';

import { AuthService } from 'src/_services/auth.service';
import { BackendService } from 'src/_services/backend.service';

import { getRecordById } from 'src/_utilities/getRecordById'; 
import { buildImageUrl } from 'src/_utilities/buildImageUrl';
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

  getImageUrl(imagePath: string) {
    return buildImageUrl(imagePath);
  }
  
  getList() {
    this.backendService.getList(`subproject/?project_id=${this.projectId}`).subscribe(list => {
      this.data = list;
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
      division: {id: ''}
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
  }

  canEditSubproject(id:any) {
    return this.subprojectPerms.includes(String(id));
  }

}
