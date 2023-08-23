import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { map, tap, catchError } from 'rxjs/operators';

import { User } from "src/_models/user";
import { Observable, of } from "rxjs";

@Injectable({ providedIn: 'root' })
export class BackendService {

    base_url = '/api/v1/';
    url_department = this.base_url + 'department/';
    url_division = this.base_url + 'division/';
    url_project = this.base_url + 'project/';
    url_subproject = this.base_url + 'subproject/';
    url_task = this.base_url + 'task/';
    url_users = this.base_url + 'users/';


    constructor(private http: HttpClient,) { }

    getDepartmentList() { }
    getDepartment() { }
    updateDepartment() { }

    getDivisionList() { }
    getDivision() { }
    updateDivision() { }

    getProjectList() { }
    getProject() { }
    updateProject() { }

    getSubprojectList() { }
    getSubproject() { }
    updateSubproject() { }

    getTaskList() { }
    getTask() { }
    updateTask() { }

    getUserList(): Observable<User[]> {
        return this.get(this.url_users)
    }
    getCurrentUser(): Observable<User> {
        return this.get(this.base_url + 'user/')
    }
    getUser(id: number): Observable<any> {
        return this.get(`${this.url_users}${id}/`)
    }
    // updateUser(user: User): Observable<any> {
    //     this.put(`${this.url_users}${id}/`, user)
    // }

    // HELPERS
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