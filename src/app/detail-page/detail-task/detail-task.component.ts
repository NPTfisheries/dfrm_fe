import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormContainerComponent } from 'src/app/forms/form-container/form-container.component';

import { AuthService } from 'src/_services/auth.service';
import { BackendService } from 'src/_services/backend.service';

import { getRecordBySlug } from 'src/_utilities/getRecordBySlug';
import { managerAccess, projectleaderAccess } from 'src/_utilities/permission-util';

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

    modalRef.result.then(() => {
      this.authService.refreshPermissions().subscribe();
    });
  }

  edit(slug: string) {
    console.log('edit: task', slug);

    const data = getRecordBySlug(this.data, slug);

    const modalRef = this.modalService.open(FormContainerComponent, { size: 'xl', });

    modalRef.componentInstance.context = this;
    modalRef.componentInstance.routeType = 'task';
    modalRef.componentInstance.data = data;
    modalRef.componentInstance.subprojectId = this.subprojectId; // needed for filtered list response from FCC
    modalRef.componentInstance.slug = slug;
  }

  canEditTask(id: any) {
    return this.taskPerms.includes(String(id));
  }
}
