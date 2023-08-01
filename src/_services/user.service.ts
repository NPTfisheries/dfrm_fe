// should deal with all needs for user and profile.
// https://angular.io/guide/architecture-services

// Services are good for tasks such as fetching data from the server, validating user input, or logging directly to the console.

import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { tap, map, catchError } from 'rxjs/operators';

import { User } from "src/_models/user";

@Injectable({ providedIn: 'root' })
export class UserService {
    private userSubject: BehaviorSubject<User | null>;
    public user$: Observable<User | null>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.userSubject = new BehaviorSubject<User | null>(null);
        this.user$ = this.userSubject.asObservable();
    }

    public get userValue() {
        return this.userSubject.value;
    }

    register(email: string, password: string, token: string) {
        var packet = { 'user': { 'email': email, 'username': email, 'password': password } }

        // authentication required, so token needed.
        return this.http.put('/api/user', packet)
            .pipe(
                tap((response) => {
                    console.log(response);
                }),
                catchError((error) => {
                    // console.error('Login failed:', error);
                    return throwError(() => error);
                })
            );
        // if passwords match, fire away
        // create, clear form, send alert.

    }


    // need to build an error handler
    // https://angular.io/tutorial/tour-of-heroes/toh-pt6

}