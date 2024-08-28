import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CdmsService {

    // apiUrl: string = 'https://npt-cdms.nezperce.org';
    apiUrl: string = ''; // necessary for proxy to function (dev)
    apiVersion: string = '/services/api/v1/';

    allowed_datastores = [78, 79, 85, 86, 92, 97, 99, 100, 102, 103, 104, 111, 113] // WT : 122 // Age: 80

    // 99? 107/110/

    constructor(
        private http: HttpClient,
    ) { }

    login(username: string, api_key: string) {
        const endpoint = 'account/login';
        const reqUrl = `${this.apiUrl}${this.apiVersion}${endpoint}`;
        const body = { Username: username, Password: api_key };
        const headers = new HttpHeaders({
            'Prefer': 'respond-async',
            'Content-Type': 'application/json'
        });

        return this.http.post(reqUrl, body, { headers, observe: 'response' }).pipe(
            map((response: any) => {
                if (response.status === 200) {
                    console.log(`Logged in as: ${response.body.User['Fullname']}`);
                }
                return response;
            })
        );
    }


    getDatastores() {
        return this.get('datastore/getdatastores').pipe(
            map((datastores: any[]) => {
                console.log(datastores);
                return datastores
                    .filter((datastore: any) => this.allowed_datastores.includes(datastore.Id))
                    .map((datastore: any) => ({
                        'Id': datastore.Id,
                        'Name': datastore.Name
                    }));
            })

        );
    }

    getProjects() {
        return this.get('project/getprojects').pipe(
            map((projects: any[]) => {
                return projects.map((project: any) => ({
                    'Id': project.Id,
                    'Name': project.Name
                }));
            })
        );
    }

    getDatastoreView(datastoreID: string, projectID?: string): Observable<any> {
        const reqUrl = `${this.apiUrl}${this.apiVersion}npt/getfulldatasetview`;
        let params = new HttpParams().set('id', datastoreID);

        if (projectID) {
            params = params.set('ProjectId', projectID);
        }

        return this.http.get(reqUrl, { params }).pipe(
            map(response => response)
        );
    }

    get(endpoint: string) {
        const reqUrl = `${this.apiUrl}${this.apiVersion}${endpoint}`;

        return this.http.get(reqUrl).pipe(
            map((response: any) => {
                return response;
            })
        );
    }

}