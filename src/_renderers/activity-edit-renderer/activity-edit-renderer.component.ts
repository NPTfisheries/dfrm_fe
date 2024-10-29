import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/_services/auth.service';

@Component({
  selector: 'app-activity-edit-renderer',
  template: `<div class="icon-wrapper d-flex align-items-center" >
                <i (click)="onEditClick()" *ngIf="renderButton()" class="fa-regular fa-pen-to-square ag-clickable"></i></div>`,
  styleUrls: ['../renderers.css']
})
export class ActivityEditRendererComponent implements ICellRendererAngularComp {

  private params: any;
  taskPerms: any;
  permissionGroup!: string;
  private permissionGroupSubscription: Subscription;

  constructor(
    private authService: AuthService
  ) {
    this.permissionGroupSubscription = this.authService.permissionGroup$.subscribe(group => {
      this.permissionGroup = group;
    });
  }

  agInit(params: any): void {
    this.params = params;
        // this.authService.taskPerms$.subscribe(taskPerms => {
        //   this.taskPerms = taskPerms;
        // });
  }

  refresh(params: ICellRendererParams): boolean {
    return true;
  }

  onEditClick() {
    console.log('Edit Activity:');
  }

  // true/false logic
  renderButton() {
    return true
    // return this.taskPerms.includes(String(this.params.data.id));
  }

}
