import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { DataService } from './data.service';
import { map, Observable } from 'rxjs';
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class ActivityService {
    //   private readonly endpoint = 'activity';
    apiUrl = environment.apiUrl
    apiVersion = environment.apiVersion

    constructor(
        private dataService: DataService<any>,
        private http: HttpClient,
    ) { }

    getDatasets(): Observable<any[]> {
        console.log('getDepartments');
        return this.dataService.getData('datasets');
    }

    getFields(dataset_id: number): Observable<any[]> {
        console.log('getFields');
        let params = { 'dataset': dataset_id };

        return this.get('fields', params);
    }

    // helper
    get(endpoint: string, params?: { [key: string]: any }) {
        const reqUrl = `${this.apiUrl}${this.apiVersion}${endpoint}`;

        let requestParams = new HttpParams();
        if (params) {
            Object.keys(params).forEach((key) => {
                if (params[key] !== undefined && params[key] !== null) {
                    requestParams = requestParams.append(key, params[key].toString());
                }
            });
        }

        // return this.http.get(reqUrl, { params: requestParams, observe: 'response', withCredentials: true }).pipe(
        // observe:'response' breaks localhost for some reason. 
        return this.http.get(reqUrl, { params: requestParams, withCredentials: true }).pipe(
            map((response: any) => {
                return response;
            })
        );
    }

}
