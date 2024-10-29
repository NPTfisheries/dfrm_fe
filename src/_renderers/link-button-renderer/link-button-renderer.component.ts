import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { getRouteType } from 'src/_utilities/route-utils';

@Component({
  selector: 'app-link-button-renderer',
  template: `<div class="icon-wrapper"><i (click)="onClick()" class="fa-regular fa-eye ag-clickable"></i><div>`,
  styleUrls: ['../renderers.css']
})

export class LinkButtonRendererComponent implements ICellRendererAngularComp {
  slug_or_id: string = '';
  routeType!: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  agInit(params: any): void {
    this.routeType = getRouteType(this.route);
    this.slug_or_id = params.value || '';
  }

  refresh(params: ICellRendererParams): boolean {
    this.slug_or_id = params.value || '';
    this.routeType = getRouteType(this.route);
    return true;
  }

  onClick() {
    console.log(this.route, this.routeType, this.slug_or_id)
    this.router.navigateByUrl(this.routeType + '/' + this.slug_or_id);
  }
}