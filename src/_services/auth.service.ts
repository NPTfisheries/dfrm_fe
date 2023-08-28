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

    public username$ = new BehaviorSubject<string | null>(null);
    public token$ = new BehaviorSubject<string | null>(null); // for http interceptor
    public isLoggedIn$ = new BehaviorSubject<boolean>(false);

    private permissionGroupSubject = new BehaviorSubject<string>('Guest');
    public permissionGroup$ = this.permissionGroupSubject.asObservable();


    constructor(
        private router: Router,
        private http: HttpClient
    ) { 
    }

    getToken(): string | null { return this.token$.getValue(); } // for http interceptor

    // Login will set user$ and token$ values to be shared
    login(email: string, password: string) {
        var credentials = { 'email': email, 'password': password }


        // https://angular.io/guide/http-server-communication
        return this.http.post<any>('/api/v1/login/', credentials)
            .pipe(
                map((response) => {
                    // console.log('login return:', response);
                    // console.log('access: ', response.access);
                    const decoded: any = jwtDecode(response.access);
                    // console.log('access decoded:', decoded);
                    

                    this.username$.next(`${response.first_name} ${response.last_name}`);
                    this.token$.next(response.access);
                    this.isLoggedIn$.next(true);
                    this.updatePermissionGroup(response.groups[0]);
                })//,
                // catchError(this.handleError)
            );
    }

    logout(): void {
        // console.log('Logging out.');
        this.username$.next(null);
        this.token$.next(null);
        this.isLoggedIn$.next(false);
        this.updatePermissionGroup('Guest');
        this.router.navigate(['home']);
    }

    register(newUser: User) {
        // password check happens in register component and server.
        return this.http.post('/api/v1/register/', newUser)
            .pipe(
                map((response) => {
                    console.log(response);
                })
            );
    }

    updatePermissionGroup(newGroup: string) {
        this.permissionGroupSubject.next(newGroup);
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