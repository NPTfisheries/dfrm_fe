// should deal with all needs for user and profile.
// https://angular.io/guide/architecture-services

// Services are good for tasks such as fetching data from the server, validating user input, or logging directly to the console.

import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { tap, map, catchError } from 'rxjs/operators';

import { User } from "src/_models/user";

import { AuthService } from "./auth.service";

@Injectable({ providedIn: 'root' })
export class UserService {
    // current user (i.e., user$) available through authService
    public userList$ = new BehaviorSubject<User[] | null>(null);

    constructor(
        private router: Router,
        private http: HttpClient,
        private authService: AuthService,
    ) {  }

    ngOnInit() {}

    register(email: string, password: string) {
        // const headers = new HttpHeaders(this.headers);
        const headers = new HttpHeaders({
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${this.authService.token$.getValue()}`
                    });
        

        const packet = { 'user': { 'email': email, 'username': email, 'password': password } };

        console.log("REG INTOSDK");
        console.log(this.authService.token$.getValue());

        return this.http.post('/api/users/register/', packet, { headers })
            .pipe(
                tap((response) => {
                    console.log(response);
                }),
                catchError((error) => {
                    // console.error('Registration failed:', error);
                    return throwError(() => error);
                })
            );
        // if passwords match, fire away
        // create, clear form, send alert.

    }

    // getUser() {
    //     const headers = new HttpHeaders(this.headers);

    //     return this.http.get('/api/user/', { headers })
    //         .pipe(
    //             tap((response) => {
    //                 this.userSubject.next(response);
    //                 // return response;
    //             }),
    //             catchError((error) => {
    //                 // console.error('Login failed:', error);
    //                 return throwError(() => error);
    //             })
    //         );
    // }


    // need to build an error handler
    // https://angular.io/tutorial/tour-of-heroes/toh-pt6

}