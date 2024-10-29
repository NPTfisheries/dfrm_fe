import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
    private authService: AuthService,
    private router: Router
  ) {
    this.permissionGroupSubscription = this.authService.permissionGroup$.subscribe(group => {
      this.permissionGroup = group;
    });
  }

  agInit(params: any): void {
    console.log(params, this.permissionGroup);
    this.params = params;
    this.authService.taskPerms$.subscribe(taskPerms => {
      this.taskPerms = taskPerms;
    });
  }

  refresh(params: ICellRendererParams): boolean {
    return true;
  }

  onEditClick() {
    this.router.navigate([`/activities/${this.params.data.activity_id}/edit`, this.params.data]);
  }

  // true/false logic
  renderButton() {
    if(this.permissionGroup === 'admin') return true;

    return this.taskPerms.includes(String(this.params.data.task.id));
  }

}
