// should deal with all needs for user and profile.
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from "rxjs";
import { map, catchError } from 'rxjs/operators';

import { User } from "src/_models/user";

@Injectable({ providedIn: 'root' })
export class UserService {
    private userSubject: BehaviorSubject<User | null>;
    public user: Observable<User | null>;
    public loggedIn$: Observable<boolean>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
        this.user = this.userSubject.asObservable();
        this.loggedIn$ = this.user.pipe(map(user => !!user));
    }

    public get userValue() {
        return this.userSubject.value;
    }

    login(email: string, password: string) {
        var credentials = { 'user': { 'email': email, 'password': password } }

        console.log('Login fired:', credentials);
        return this.http.post('/api/users/login/', credentials)
            .pipe(map(user => {
                console.log(user);
                this.userSubject.next(user);
                return user;
            }));
    }

    logout() {
        // this.currentUser = null;
        this.userSubject.next(null);
    }

}