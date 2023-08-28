import { Component, OnInit, OnChanges, ViewChild, Input, SimpleChanges } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormContainerComponent } from 'src/app/forms/form-container/form-container.component';

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
  list: any | undefined;

  constructor(
    private authService: AuthService, 
    private alertService: AlertService,
    private backendService: BackendService,
    private modalService: NgbModal,
  ) {}

  ngOnInit(): void {
    this.permissionGroup = this.authService.getPermissionGroup();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['projectId'] && !changes['projectId'].isFirstChange()) {
      this.getList();
    }
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

      modalRef.result.then((result) => {
        modalRef.componentInstance.updateList.subscribe((newList: any) => {
          this.list = newList;
          this.alertService.success(`New subproject created!`, { autoClose: true });
        });
      }).catch((reason) => { }); // prevents error on exiting modal by clicking outside
  }

}
