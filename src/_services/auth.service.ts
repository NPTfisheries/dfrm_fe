// https://angular.io/guide/architecture-services

import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, throwError } from "rxjs";
import { map, catchError } from 'rxjs/operators';

import { User } from "src/_models/user";

@Injectable({ providedIn: 'root' })
export class AuthService {

    public user$ = new BehaviorSubject<User | null>(null);
    public token$ = new BehaviorSubject<string |null>(null);

    constructor(
        private router: Router,
        private http: HttpClient
    ) { }

    // Login will set user$ and token$ values to be shared
    login(email: string, password: string) {
        var credentials = { 'user': { 'email': email, 'password': password } }

        // https://angular.io/guide/http-server-communication
        return this.http.post<any>('/api/users/login/', credentials)
            .pipe(
                map((response) => {
                    // console.log('login return:', response);
                    // console.log('user...', response.user);
                    // console.log('token? ', response.user.token);
                    
                    this.user$.next(response.user);  // next is the correct way to update a value of BehaviorSubject
                    this.token$.next(response.user.token);
                })//,
                // catchError(this.handleError)
            );
    }

    logout(): void {
        // console.log('Logging out.');
        this.user$.next(null);
        this.token$.next(null);
        this.router.navigate(['home']);
    }


    // https://angular.io/guide/http-handle-request-errors
    private handleError(error: HttpErrorResponse) {
        if (error.status === 0) {
            console.error('Client error:', error.error);
        } else {
            console.error('Console error:', error.error);
        }
        return throwError(() => new Error('Error. Please try again later.'));
    }

}