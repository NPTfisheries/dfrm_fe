import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CdmsService {

    // apiUrl: string = 'https://npt-cdms.nezperce.org';
    apiUrl: string = ''; // necessary for proxy to function (dev)

    constructor(
        private http: HttpClient,
    ) { }

    login(username: string, api_key: string) {
        const reqUrl = `${this.apiUrl}/services/api/v1/account/login`;
        const body = { Username: username, Password: api_key };
        const headers = new HttpHeaders({
            'Prefer': 'respond-async',
            'Content-Type': 'application/json'
        });

        return this.http.post(reqUrl, body, { headers, observe: 'response'}).pipe(
            map((response:any) => {
                if (response.status === 200) {
                    console.log(`Logged in as: ${response.body['Fullname']}`);
                }
                return response;
            })
        );
    }

    getDatasetView(datastoreID: string, projectID?: string): Observable<any> {
        const reqUrl = `${this.apiUrl}/services/api/v1/npt/getfulldatasetview`;
        let params = new HttpParams().set('id', datastoreID);

        if (projectID) {
            params = params.set('ProjectId', projectID);
        }

        return this.http.get(reqUrl, { params }).pipe(
            map(response => response)
        );
    }

}