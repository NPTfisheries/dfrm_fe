// AUTH SERVICE:  login, logout, permissions?, sharing JWT.
// https://angular.io/guide/architecture-services

import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, throwError } from "rxjs";
import { tap, map, catchError } from 'rxjs/operators';

import { User } from "src/_models/user";

@Injectable({ providedIn: 'root' })
export class AuthService {
    private userSubject: BehaviorSubject<User | null>;
    public user$: Observable<User | null>;
    public loggedIn$: Observable<boolean>;
    public token$: Subject<string>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.userSubject = new BehaviorSubject<User | null>(null);
        this.user$ = this.userSubject.asObservable();
        this.loggedIn$ = this.user$.pipe(map(user => !!user));
        this.token$ = new Subject<string>;
    }

    public get userValue() {
        return this.userSubject.value;
    }

    login(email: string, password: string) {
        var credentials = { 'user': { 'email': email, 'password': password } }

        return this.http.post('/api/users/login/', credentials)
            .pipe(
                tap((response) => {
                    this.token$.next(Object.values(response)[0].token);
                    console.log('token$: ', this.token$);
                }),
                map((user: User) => {

                    // console.log('Inside service: ', Object.entries(user)); // Obj.entries returns an array.
                    console.log('MAP:', user);

                    // this.token$ = user.token;
                    // this.userSubject.next(tokenlessUser);
                    this.userSubject.next(user);

                    // return user; // not sure this does anything.
                }),
                catchError((error) => {
                    // console.error('Login failed:', error);
                    return throwError(() => error);
                })
            );
    }

    logout() {
        console.log('Logging out.');
        this.userSubject.next(null);
        // logout should send you to home page
        this.router.navigate(['home']);
    }


    // need to build an error handler
    // https://angular.io/tutorial/tour-of-heroes/toh-pt6

}