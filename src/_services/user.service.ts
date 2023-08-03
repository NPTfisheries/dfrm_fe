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
    private userSubject: BehaviorSubject<User | null>;
    public user$: Observable<User | null>;
    private headers: any;

    constructor(
        private router: Router,
        private http: HttpClient,
        private authService: AuthService,
    ) {
        this.userSubject = new BehaviorSubject<User | null>(null);
        this.user$ = this.userSubject.asObservable();
        // this.authService.token$.subscribe((token: string) => {
        //     this.headers = {
        //         "Content-Type": "application/json",
        //         "Authorization": `Bearer ${token}`
        //     }
        // })
    }

    ngOnInit() {
        this.authService.token$.subscribe((token) => {
            console.log(token);
            //     this.headers = {
            //         "Content-Type": "application/json",
            //         "Authorization": `Bearer ${token}`
            //     }
        });
    }

    public get userValue() {
        return this.userSubject.value;
    }

    register(email: string, password: string) {
        const headers = new HttpHeaders(this.headers);

        const packet = { 'user': { 'email': email, 'username': email, 'password': password } };

        return this.http.post('/api/users/register/', packet, { headers })
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

    getUser() {
        const headers = new HttpHeaders(this.headers);

        return this.http.get('/api/user/', { headers })
            .pipe(
                tap((response) => {
                    this.userSubject.next(response);
                    // return response;
                }),
                catchError((error) => {
                    // console.error('Login failed:', error);
                    return throwError(() => error);
                })
            );

    }


    // need to build an error handler
    // https://angular.io/tutorial/tour-of-heroes/toh-pt6

}