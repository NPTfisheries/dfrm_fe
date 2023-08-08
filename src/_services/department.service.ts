import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";

import { BackendService } from "./backend.service";
import { Department } from "src/_models/department";

@Injectable({ providedIn: 'root' })
export class DepartmentService {

    private url: string = 'api/v1/department/';

    public department$ = new BehaviorSubject<Department | null>(null);
    public departmentList$ = new BehaviorSubject<Department[] | null>(null);

    constructor(
        private backendService: BackendService,
    ) { }

    getDepartment(slug: string) {
        return this.backendService.get(this.url+slug);
    }

    getDepartmentList() {
        return this.backendService.get(this.url);
    }

    createDepartment(object: Department) {
        return this.backendService.post(this.url, object);

    }
    updateDepartment() {

    }

}