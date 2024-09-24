import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { DataService } from './data.service';
import { map, Observable } from 'rxjs';
import { environment } from "src/environments/environment";
import { Activity } from 'src/_models/interfaces';

@Injectable({
    providedIn: 'root'
})
export class ActivityService {
    apiUrl = environment.apiUrl;
    apiVersion = environment.apiVersion;
    endpoint = 'activities';

    constructor(
        private dataService: DataService<any>,
        private http: HttpClient,
    ) { }

    getActivities(): Observable<Activity[]> {
        console.log('getActivities');
        return this.dataService.getData(this.endpoint);
    }

    refreshActivities(): Observable<Activity[]> {
        return this.dataService.refreshData(this.endpoint);
    }

    getDatasets(): Observable<any[]> {
        console.log('getDatasets');
        return this.dataService.getData('datasets');
    }

    getFields(dataset_id: number): Observable<any[]> {
        console.log('getFields for dataset_id:', dataset_id);
        let params = { 'dataset_id': dataset_id };

        return this.get('fields', params);
    }

    saveActivity(activity: Activity) {
        const reqUrl = `${this.apiUrl}${this.apiVersion}${this.endpoint}/`;

        return this.http.post(reqUrl, activity)
            .pipe(
                map((response) => {
                    console.log('Saved new Activity.');
                    console.log(`${reqUrl} response:`, response);
                    return response;
                })
            );
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

        return this.http.get(reqUrl, { params: requestParams, withCredentials: true }).pipe(
            map((response: any) => {
                console.log(response);
                return response;
            })
        );
    }

}
