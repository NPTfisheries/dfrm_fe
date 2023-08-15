import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { map, tap, catchError } from 'rxjs/operators';

import { User } from "src/_models/user";
import { Observable, of } from "rxjs";

@Injectable({ providedIn: 'root' })
export class BackendService {

    url_users = '/api/v1/users/';

    constructor(
        private http: HttpClient,
    ) { }

    options(url: string) {
        return this.http.options(url)
            .pipe(
                map((response) => {
                    console.log(`${url} response:`, response);
                    return response;
                })
            );
    }

    get(url: string) {
        return this.http.get(url)
            .pipe(
                map((response) => {
                    console.log(`${url} response:`, response);
                    return response;
                })
            );
    }

    patch(url: string, object: object) {
        return this.http.patch(url, object)
            .pipe(
                map((response) => {
                    console.log(`${url} response:`, response);
                    return response;
                })
            );
    }

    post(url: string, object: object) {
        return this.http.post(url, object)
            .pipe(
                map((response) => {
                    console.log(`${url} response:`, response);
                    return response;
                })
            );
    }

    put(url: string, object: object) {
        return this.http.put(url, object)
            .pipe(
                map((response) => {
                    console.log(`${url} response:`, response);
                    return response;
                })
            );
    }

    // need to build an error handler
    // https://angular.io/tutorial/tour-of-heroes/toh-pt6

    // GET
    getUser(id: number): Observable<User> {
        const url = `${this.url_users}/${id}`
        return this.http.get<User>('/api/v1/users/')
            .pipe(
                // tap(_ => this.log('fetched user id=${id}')),
                catchError(this.handleError<User>(`getUser id=${id}`))
            );
    }

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.url_users)
            .pipe(
                // tap(_ => this.log('fetched user list')),
                catchError(this.handleError<User[]>('getUsers', []))
            );
    }

    updateUser(user: User): Observable<any> {
        return this.http.put(this.url_users, user)
        .pipe(
            // tap(_ => this.log(`updated user id =${user.id}`)),
            catchError(this.handleError<any>('updateUser'))
        );
    }

    /**
 * Handle Http operation that failed.
 * Let the app continue.
 *
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            // this.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }


}