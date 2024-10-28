import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, shareReplay, filter } from 'rxjs/operators';
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class DataService<T> {
    private dataSubjects: { [key: string]: BehaviorSubject<T[] | null> } = {};
    private dataObservables: { [key: string]: Observable<T[]> } = {};

    private itemSubjects: { [key: string]: BehaviorSubject<T | null> } = {};
    private itemObservables: { [key: string]: Observable<T | null> } = {};

    apiUrl = environment.apiUrl;
    apiVersion = environment.apiVersion;

    constructor(private http: HttpClient) { }

    // Fetches data from the specified endpoint and caches it.
    getData(endpoint: string): Observable<T[]> {
        // If the observable for this endpoint already exists, return it
        if (this.dataObservables[endpoint]) {
            // console.log('Returned existing list!');
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
                tap(data => this.dataSubjects[endpoint].next(data))
            ).subscribe();
        }

        return this.dataObservables[endpoint];
    }

    // Fetches a single item by key and caches it (e.g., Division Detail).
    getItem(endpoint: string, key: string): Observable<T | null> {
        const cacheKey = `${endpoint}/${key}`;

        if (this.itemObservables[cacheKey]) {
            console.log('Returned existing item!');
            return this.itemObservables[cacheKey];
        }

        if (!this.itemSubjects[cacheKey]) {
            this.itemSubjects[cacheKey] = new BehaviorSubject<T | null>(null);
        }

        this.itemObservables[cacheKey] = this.itemSubjects[cacheKey].asObservable().pipe(
            filter((data): data is T => data !== null),
            shareReplay(1)
        );

        if (!this.itemSubjects[cacheKey].value) {
            console.log(`HTTP request for ${this.apiUrl}${this.apiVersion}${cacheKey}`);
            this.http.get<T>(`${this.apiUrl}${this.apiVersion}${cacheKey}`).pipe(
                tap(data => this.itemSubjects[cacheKey].next(data))
            ).subscribe();
        }

        return this.itemObservables[cacheKey];
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

    // Refreshes a single item by key and updates the cache.
    refreshItem(endpoint: string, key: string): Observable<T | null> {
        const cacheKey = `${endpoint}/${key}`;

        console.log(`Refreshing item for ${cacheKey}`);

        if (!this.itemSubjects[cacheKey]) {
            this.itemSubjects[cacheKey] = new BehaviorSubject<T | null>(null);
        }

        this.itemObservables[cacheKey] = this.itemSubjects[cacheKey].asObservable().pipe(
            filter((data): data is T => data !== null),
            shareReplay(1)
        );

        return this.http.get<T>(`${this.apiUrl}${this.apiVersion}${cacheKey}`).pipe(
            tap(data => this.itemSubjects[cacheKey].next(data))
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

    // Clears the cached item for a specific key.
    clearItemCache(endpoint: string, key: string): void {
        const cacheKey = `${endpoint}/${key}`;
        if (this.itemSubjects[cacheKey]) {
            this.itemSubjects[cacheKey].next(null);
        }
        if (this.itemObservables[cacheKey]) {
            delete this.itemObservables[cacheKey];
        }
    }

}
