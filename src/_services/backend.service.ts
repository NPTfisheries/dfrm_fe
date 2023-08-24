import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { map, tap, catchError } from 'rxjs/operators';

import { User } from "src/_models/user";
import { Observable, of } from "rxjs";

@Injectable({ providedIn: 'root' })
export class BackendService {

    base_url = '/api/v1/';

    constructor(
        private http: HttpClient,
        ) { }

    getList(routeType: string): Observable<any[]> {
        const URL = `${this.base_url}${routeType}`;
        return this.get(URL);
    }

    // getDetailById(routeType: string, id: number): Observable<any>  {
    //     const URL = `${this.base_url}${routeType}/${id}/`;
    //     return this.get(URL);
    // }

    getDetail(routeType: string, slug: string): Observable<any>  {
        const URL = `${this.base_url}${routeType}/${slug}/`;
        return this.get(URL);
    }

    newItem(routeType: string, object:object): Observable<any>  {
        const URL = `${this.base_url}${routeType}/`;
        return this.post(URL, object);
    }
    
    // updateItemById(routeType: string, id: number, object:object): Observable<any>  {
    //     const URL = `${this.base_url}${routeType}/${id}/`;
    //     return this.put(URL, object);
    // }

    updateItem(routeType: string, slug:string, object:object): Observable<any>  {
        const URL = `${this.base_url}${routeType}/${slug}/`;
        return this.put(URL, object);
    }

    getCurrentUser(): Observable<User> {
        return this.get(this.base_url + 'user/');
    }

    getImageBySlug(slug:string) {
        return this.get(`/api/v1/image/${slug}/`);
    }

    
    // HELPERS -- change to private eventually?
    get(url: string): Observable<any> {
        return this.http.get(url) //, { observe: 'response' })
            .pipe(
                map((response) => {
                    console.log(`${url} response:`, response);
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