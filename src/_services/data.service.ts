import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, tap, shareReplay, filter } from 'rxjs/operators';
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class DataService<T> {
    private dataSubjects: { [key: string]: BehaviorSubject<T[] | null> } = {};
    private dataObservables: { [key: string]: Observable<T[]> } = {};

    apiUrl = environment.apiUrl;
    apiVersion = environment.apiVersion;

    constructor(private http: HttpClient) { }

    // Fetches data from the specified endpoint and caches it.
    getData(endpoint: string): Observable<T[]> {
        // If the observable for this endpoint already exists, return it
        if (this.dataObservables[endpoint]) {
            console.log('Returned existing list!');
            return this.dataObservables[endpoint];
        }

        // Initialize the BehaviorSubject if it doesn't exist
        if (!this.dataSubjects[endpoint]) {
            this.dataSubjects[endpoint] = new BehaviorSubject<T[] | null>(null);
        }

        // Create the observable with shareReplay to cache the latest value
        this.dataObservables[endpoint] = this.dataSubjects[endpoint].asObservable().pipe(
            filter((data): data is T[] => data !== null),  // Filter out null values
            shareReplay(1)
        );

        // If data is not already fetched, make the HTTP request
        if (!this.dataSubjects[endpoint].value) {
            console.log(`HTTP request for ${endpoint}`);
            this.http.get<any>(`${this.apiUrl}${this.apiVersion}${endpoint}`).pipe(
                map(data => endpoint === 'facility' ? data.features : data), // data.features is the array for facilities
                tap(data => this.dataSubjects[endpoint].next(data))
            ).subscribe();
        }

        return this.dataObservables[endpoint];
    }    

    // Refreshes data by making a new HTTP request.
    refreshData(endpoint: string): Observable<T[]> {
        console.log(`Refreshing data for ${endpoint}`);
        if (!this.dataSubjects[endpoint]) {
            this.dataSubjects[endpoint] = new BehaviorSubject<T[] | null>(null);
        }

        this.dataObservables[endpoint] = this.dataSubjects[endpoint].asObservable().pipe(
            filter((data): data is T[] => data !== null),  // Filter out null values
            shareReplay(1)
        );

        return this.http.get<T[]>(`${this.apiUrl}${this.apiVersion}${endpoint}`).pipe(
            tap(data => this.dataSubjects[endpoint].next(data))
        );
    }

    // Clears the cached data for a specific endpoint.
    clearCache(endpoint: string): void {
        if (this.dataSubjects[endpoint]) {
            this.dataSubjects[endpoint].next(null);
        }
        if (this.dataObservables[endpoint]) {
            delete this.dataObservables[endpoint];
        }
    }
}
