// https://angular.io/guide/architecture-services

import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, throwError } from "rxjs";
import { map, catchError } from 'rxjs/operators';
import jwtDecode from 'jwt-decode';

import { User } from "src/_models/user";

@Injectable({ providedIn: 'root' })
export class AuthService {

    public user$ = new BehaviorSubject<User | null>(null);
    public token$ = new BehaviorSubject<string | null>(null);
    public isLoggedIn$ = new BehaviorSubject<boolean>(false);

    constructor(
        private router: Router,
        private http: HttpClient
    ) { }

    getUser(): User | null {
        return this.user$.getValue();
    }

    getIsLoggedIn(): boolean | null {
        return this.isLoggedIn$.getValue();
    }

    getToken(): string | null {
        return this.token$.getValue();
    }

    // Login will set user$ and token$ values to be shared
    login(email: string, password: string) {
        var credentials = { 'email': email, 'password': password }


        // https://angular.io/guide/http-server-communication
        return this.http.post<any>('/api/v1/login/', credentials)
            .pipe(
                map((response) => {
                    console.log('login return:', response);
                    // console.log('access: ', response.access);
                    const decoded = jwtDecode(response.access);
                    console.log('access decoded:', decoded);

                    // this.user$.next(response.user);  // next is the correct way to update a value of BehaviorSubject
                    this.token$.next(response.access);
                    this.isLoggedIn$.next(true);
                })//,
                // catchError(this.handleError)
            );
    }

    logout(): void {
        // console.log('Logging out.');
        this.user$.next(null);
        this.token$.next(null);
        this.isLoggedIn$.next(false);

        console.log('token:', this.token$);
        console.log('isLoggedIn$:', this.isLoggedIn$);
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