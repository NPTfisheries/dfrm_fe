import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { User } from "src/_models/user";
import { Observable, of } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({ providedIn: 'root' })
export class BackendService {

    apiUrl = environment.apiUrl;  // http://localhost:8000
    apiVersion = '/api/v1/';

    constructor(
        private http: HttpClient,
        ) { }

    getList(routeType: string): Observable<any[]> {
        const URL = `${this.apiUrl}${this.apiVersion}${routeType}`;
        return this.get(URL);
    }

    getDetail(routeType: string, slug: string): Observable<any>  {
        const URL = `${this.apiUrl}${this.apiVersion}${routeType}/${slug}/`;
        return this.get(URL);
    }

    newItem(routeType: string, object:object): Observable<any>  {
        const URL = `${this.apiUrl}${this.apiVersion}${routeType}/`;
        return this.post(URL, object);
    }

    updateItem(routeType: string, slug:string, object:object): Observable<any>  {
        const URL = `${this.apiUrl}${this.apiVersion}${routeType}/${slug}/`;
        // return this.put(URL, object);
        return this.patch(URL, object);
    }

    getCurrentUser(): Observable<User> {
        return this.get(this.apiUrl + this.apiVersion + 'user/');
    }

    getImageById(id:number) {
        return this.get(`${this.apiUrl}${this.apiVersion}image/${id}/`);
    }

    updateProfile(profile: any) {
        // return this.put(`${this.apiUrl}${this.apiVersion}profile/`, profile);
        return this.patch(`${this.apiUrl}${this.apiVersion}profile/`, profile);
    }

    // updateProfilePhoto(photo: any) {
    //     return this.put(`${this.apiUrl}${this.apiVersion}profile-photo/`, photo);
    // }

    updateProfilePhoto(profile: any) {
        return this.patch(`${this.apiUrl}${this.apiVersion}profile/`, profile);
    }

    updatePassword(passwordUpdateForm: any) {
        return this.put(`${this.apiUrl}${this.apiVersion}change_password/`, passwordUpdateForm);
    }

    objectLookup(object_type: string) {
        const params = new HttpParams().set('object_type', object_type); // Facility, Task

        return this.http.get(`${this.apiUrl}${this.apiVersion}lookup`, { params })
    }

    deleteFile(routeType: string, pk: string) {
        const url = `${this.apiUrl}${this.apiVersion}${routeType}/${pk}/`;
        return this.http.delete(url);
    }
    
    // HELPERS -- change to private eventually?
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

    
    patch(url: string, object: object): Observable<any> {
        return this.http.patch(url, object)
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