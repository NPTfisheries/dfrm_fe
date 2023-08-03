// AUTH SERVICE:  login, logout, permissions, JWT.
// https://angular.io/guide/architecture-services

import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, throwError } from "rxjs";
import { map, catchError } from 'rxjs/operators';

import { User } from "src/_models/user";

@Injectable({ providedIn: 'root' })
export class AuthService {

    private tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(''); // user will have token
    public token$: Observable<string> = this.tokenSubject.asObservable();

    public user$ = new BehaviorSubject<User | null>(null);

    constructor(
        private router: Router,
        private http: HttpClient
    ) {  }

    token() {
        if (!this.user$) {
            return null;
        } else {
            return Object.values(this.user$)[0].token;
        }
    }

    login(email: string, password: string) {
        var credentials = { 'user': { 'email': email, 'password': password } }

        // https://angular.io/guide/http-server-communication
        return this.http.post<User>('/api/users/login/', credentials)
            .pipe(
                map((user) => {
                    // console.log('login return:', user);
                    this.user$.next(user);  // next is the correct way to update a value of BehaviorSubject
                                }),
                catchError(this.handleError)
            );
    }

    logout() {
        console.log('Logging out.');
        this.user$.next(null); // reset token
        this.router.navigate(['home']); // nav home
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