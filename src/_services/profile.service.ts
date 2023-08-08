// should deal with all needs for user and profile.
// https://angular.io/guide/architecture-services

// Services are good for tasks such as fetching data from the server, validating user input, or logging directly to the console.

import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, throwError } from "rxjs";

import { BackendService } from "./backend.service";
import { Profile } from "src/_models/profile";

@Injectable({ providedIn: 'root' })
export class ProfileService {
    public profile$ = new BehaviorSubject<Profile | null>(null);
    private baseUrl = '/api/v1/profile/';

    constructor(
        private http: HttpClient,
        private backendService: BackendService,
    ) { }

    ngOnInit() { }

    getFields() {
        // return this.backendService.options()
    }

    getProfile() {
        console.log('Getting Profile...');
        return this.backendService.get(this.baseUrl);
    }

    updateProfile(profile: Profile) {
        console.log('Edit Profile');
    }

}