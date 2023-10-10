import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormContainerComponent } from 'src/app/forms/form-container/form-container.component';

import { AuthService } from 'src/_services/auth.service';
import { BackendService } from 'src/_services/backend.service';

import { getRecordById } from 'src/_utilities/getRecordById';
import { managerAccess, projectleaderAccess } from 'src/_utilities/permission-util';
import { buildImageUrl } from 'src/_utilities/buildImageUrl';

@Component({
  selector: 'app-detail-task',
  templateUrl: './detail-task.component.html',
  styleUrls: ['./detail-task.component.css']
})
export class DetailTaskComponent implements OnInit, OnChanges {

  @Input() subprojectId: number | undefined;

  addTask: boolean = false;
  managerPerms: boolean = false;
  projectleaderPerms: boolean = false;
  taskPerms: any;

  data: any | undefined;

  constructor(
    private authService: AuthService,
    private backendService: BackendService,
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    this.getList();
    this.checkPermissions();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['subprojectId'] && !changes['subprojectId'].isFirstChange()) {
      this.getList();
      this.checkPermissions();
    }
  }

  checkPermissions() {
    this.authService.permissionGroup$.subscribe((permGroup: string) => {
      this.managerPerms = managerAccess(permGroup);
      this.projectleaderPerms = projectleaderAccess(permGroup);
    });
    this.authService.subprojectPerms$.subscribe((subprojectPerms: any) => {
      this.addTask = subprojectPerms.includes(String(this.subprojectId));
    });
    this.authService.taskPerms$.subscribe((taskPerms:any) => {
      this.taskPerms = taskPerms;
    });
  }

  getImageUrl(imagePath: string) {
    return buildImageUrl(imagePath);
  }

  getList() {
    this.backendService.getList(`task/?subproject_id=${this.subprojectId}`).subscribe(list => {
      this.data = list;
    });
  }

  add() {
    // console.log('adding task');

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
    modalRef.componentInstance.addOrEdit = 'add';

    modalRef.result.then(() => {
      console.log('MODAL CLOSED');
      this.authService.refreshPermissions().subscribe();
    });
  }

  edit(id: string) {
    // task uses id
    console.log('edit: task', id);

    const data = getRecordById(this.data, id);

    const modalRef = this.modalService.open(FormContainerComponent, { size: 'xl', });

    modalRef.componentInstance.context = this;
    modalRef.componentInstance.routeType = 'task';
    modalRef.componentInstance.data = data;
    modalRef.componentInstance.subprojectId = this.subprojectId; // needed for filtered list response from FCC
    modalRef.componentInstance.identifier = id;
    modalRef.componentInstance.addOrEdit = 'edit';
  }

  canEditTask(id: any) {
    return this.taskPerms.includes(String(id));
  }
}
