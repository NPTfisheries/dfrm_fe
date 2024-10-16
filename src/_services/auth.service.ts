// https://angular.io/guide/architecture-services

import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, throwError } from "rxjs";
import { map, catchError } from 'rxjs/operators';
import jwtDecode from 'jwt-decode';

import { User } from "src/_models/interfaces";
import { environment } from "src/environments/environment";

@Injectable({ providedIn: 'root' })
export class AuthService {

    apiUrl = environment.apiUrl;
    apiVersion = environment.apiVersion;

    public username$ = new BehaviorSubject<string | null>(null);
    public token$ = new BehaviorSubject<string | null>(null); // for http interceptor
    public isLoggedIn$ = new BehaviorSubject<boolean>(false);

    private permissionGroupSubject = new BehaviorSubject<string>('Guest');
    public permissionGroup$ = this.permissionGroupSubject.asObservable();

    private projectPermsSubject = new BehaviorSubject<object>([]);
    public projectPerms$ = this.projectPermsSubject.asObservable();
  
    private taskPermsSubject = new BehaviorSubject<object>([]);
    public taskPerms$ = this.taskPermsSubject.asObservable();

    private imagePermsSubject = new BehaviorSubject<object>([]);
    public imagePerms$ = this.imagePermsSubject.asObservable();

    private documentPermsSubject = new BehaviorSubject<object>([]);
    public documentPerms$ = this.documentPermsSubject.asObservable();

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
        return this.http.post<any>(`${this.apiUrl}${this.apiVersion}login/`, credentials)
            .pipe(
                map((response) => {
                    // console.log('login return:', response);
                    // console.log('access: ', response.access);
                    const decoded: any = jwtDecode(response.access);
                    // console.log('access decoded:', decoded);
                    
                    this.username$.next(`${response.first_name} ${response.last_name}`);
                    this.token$.next(response.access);
                    this.isLoggedIn$.next(true);

                    this.permissionGroupSubject.next(response.groups[0])
                    this.projectPermsSubject.next(response.project_objects);
                    this.taskPermsSubject.next(response.task_objects);
                    this.imagePermsSubject.next(response.image_objects);
                    this.documentPermsSubject.next(response.document_objects);
                })//,
                // catchError(this.handleError)
            );
    }

    logout(): void {
        // console.log('Logging out.');
        this.username$.next(null);
        this.token$.next(null);
        this.isLoggedIn$.next(false);

        this.permissionGroupSubject.next('Guest')
        this.projectPermsSubject.next([]);
        this.taskPermsSubject.next([]);
        this.imagePermsSubject.next([]);
        this.documentPermsSubject.next([]);
        this.router.navigate(['home']);
    }

    register(newUser: User) {
        // password check happens in register component and server.
        return this.http.post(`${this.apiUrl}${this.apiVersion}register/`, newUser)
            .pipe(
                map((response) => {
                    console.log(response);
                })
            );
    }

    refreshPermissions() {
        return this.http.get(`${this.apiUrl}${this.apiVersion}permissions`)
        .pipe(
            map((response: any) => {
                // console.log("REFRESH PERMS:", response);
                this.projectPermsSubject.next(response.project_objects);
                this.taskPermsSubject.next(response.task_objects);
                this.imagePermsSubject.next(response.image_objects);
                this.documentPermsSubject.next(response.document_objects);
            })
        )
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