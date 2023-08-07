import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class BackendService {

    constructor(
        private http: HttpClient,
    ) {  }

    get(url: string) {
        // password check happens in register component and server.
        return this.http.get(url)
            .pipe(
                map((response) => {
                    console.log(response);
                })
            );
    }

    post(url: string, object: Object) {
        // password check happens in register component and server.
        return this.http.post(url, object)
            .pipe(
                map((response) => {
                    console.log(response);
                })
            );
    }

    put(url: string, object: Object) {
        // password check happens in register component and server.
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