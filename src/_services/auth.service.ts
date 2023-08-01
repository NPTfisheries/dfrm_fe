// AUTH SERVICE:  login, logout, permissions, JWT.
// https://angular.io/guide/architecture-services

import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, throwError } from "rxjs";
import { tap, map, catchError } from 'rxjs/operators';

import { User } from "src/_models/user";

class Auth {
    token?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
    
    // private authSubject: BehaviorSubject<Auth | null>;
    // public auth$: Observable<Auth | null>;
    public loggedIn$: Observable<boolean>;
    private tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
    public token$: Observable<string> = this.tokenSubject.asObservable();

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        // this.authSubject = new BehaviorSubject<Auth | null>(null);
        // this.auth$ = this.authSubject.asObservable();
        this.loggedIn$ = this.token$.pipe(map(token => !!token));
    }

    // public get authValue() {
    //     return this.authSubject.value;
    // }

    login(email: string, password: string) {
        var credentials = { 'user': { 'email': email, 'password': password } }

        return this.http.post('/api/users/login/', credentials)
            .pipe(
                tap((response) => {
                    this.tokenSubject.next(Object.values(response)[0].token);
                }),
                // map((auth: Auth) => {

                //     // console.log('Inside service: ', Object.entries(auth)); // Obj.entries returns an array.
                //     // console.log('MAP:', auth);
                //     this.authSubject.next(auth);

                //     // return user; // not sure this does anything.
                // }),
                catchError((error) => {
                    // console.error('Login failed:', error);
                    return throwError(() => error);
                })
            );
    }

    logout() {
        console.log('Logging out.');
        // this.authSubject.next(null);
        this.tokenSubject.next('');
        // logout should send you to home page
        this.router.navigate(['home']);
    }


    // need to build an error handler
    // https://angular.io/tutorial/tour-of-heroes/toh-pt6

}