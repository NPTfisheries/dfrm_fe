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

    getActivity(id: number) {
        console.log('getActivity:', id);
        return this.get(`${this.endpoint}/${id}`);
    }

    refreshActivities(): Observable<Activity[]> {
        return this.dataService.refreshData(this.endpoint);
    }

    getFields(task_type: string): Observable<any[]> {
        console.log('getFields for task_type:', task_type);
        let params = { 'task_type': task_type };

        return this.get('fields', params);
    }

    getDetailFields(task_type: string): Observable<any[]> {
        console.log('getFields for task_type:', task_type);
        let params = { 'task_type': task_type };

        return this.get('fields', params).pipe(
            map((fields: any[]) => fields.filter(field => field.field_for === 'detail'))
        );
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
