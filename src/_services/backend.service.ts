import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class BackendService {

    constructor(
        private http: HttpClient,
    ) { }

    options(url: string) {
        return this.http.get(url)
            .pipe(
                map((response) => {
                    console.log(response);
                    return response;
                })
            );
    }

    get(url: string) {
        return this.http.get(url)
            .pipe(
                map((response) => {
                    console.log(response);
                    return response;
                })
            );
    }

    post(url: string, object: Object) {
        return this.http.post(url, object)
            .pipe(
                map((response) => {
                    console.log(response);
                })
            );
    }

    put(url: string, object: Object) {
        return this.http.put(url, object)
            .pipe(
                map((response) => {
                    console.log(response);
                })
            );
    }

    // need to build an error handler
    // https://angular.io/tutorial/tour-of-heroes/toh-pt6

}