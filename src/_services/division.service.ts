import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";

import { BackendService } from "./backend.service";
import { Division } from "src/_models/division";

@Injectable({ providedIn: 'root' })
export class DivisionService {

    private url: string = 'api/v1/division/';

    // public division$ = new BehaviorSubject<Division | null>(null);
    public divisionList$ = new BehaviorSubject<Division[] | null>(null);

    constructor(
        private backendService: BackendService,
    ) { }

    getDivision(id: Number) {
        // return this.backendService.get()
    }

    getDivisionList() {
        return this.backendService.get(this.url);
    }

    createDivision() {

    }

    updateDivision() {

    }

}