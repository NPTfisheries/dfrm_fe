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
    private user: Observable<User | null>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
        this.user = this.userSubject.asObservable();
    }

    public get userValue() {
        return this.userSubject.value;
    }

    login(email: string, password: string) {
        var postData = {'user': { 'email':email, 'password':password }} 
        
        console.log('Login fired:', postData);
            // return this.httpClient.get('http://jsonplaceholder.typicode.com/posts');
        return this.http.post('/api/users/login/', postData)
            .pipe(map(user => {
                // this.userSubject.next(user);
                return user;
            }))
    }
}