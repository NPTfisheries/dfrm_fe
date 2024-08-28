import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Observable, of } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({ providedIn: 'root' })
export class BackendService {

    apiUrl = environment.apiUrl;
    apiVersion = environment.apiVersion;

    constructor(
        private http: HttpClient,
        ) { }

    newItem(routeType: string, object:object): Observable<any>  {
        const URL = `${this.apiUrl}${this.apiVersion}${routeType}/`;
        return this.post(URL, object);
    }

    updateItem(routeType: string, slug:string, object:object): Observable<any>  {
        const URL = `${this.apiUrl}${this.apiVersion}${routeType}/${slug}/`;
        return this.put(URL, object);
    }

    updateProfile(profile: any) {
        return this.put(`${this.apiUrl}${this.apiVersion}profile/`, profile);
    }

    updatePassword(passwordUpdateForm: any) {
        return this.put(`${this.apiUrl}${this.apiVersion}change_password/`, passwordUpdateForm);
    }

    deleteFile(routeType: string, pk: string) {
        const url = `${this.apiUrl}${this.apiVersion}${routeType}/${pk}/`;
        return this.http.delete(url);
    }
    
    // helpers
    get(url: string): Observable<any> {
        return this.http.get(url) //, { observe: 'response' })
            .pipe(
                map((response) => {
                    // console.log(`${url} response:`, response);
                    return response;
                })
            );
    }

    post(url: string, object: object): Observable<any> {
        return this.http.post(url, object)
            .pipe(
                map((response) => {
                    console.log(`${url} response:`, response);
                    return response;
                })
            );
    }

    put(url: string, object: object): Observable<any> {
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