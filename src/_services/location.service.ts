import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { map, Observable } from 'rxjs';
import { Location } from 'src/_models/interfaces';

@Injectable({
    providedIn: 'root'
})
export class LocationService {
    private readonly endpoint = 'locations';

    constructor(private dataService: DataService<Location>) { }

    getLocations(): Observable<Location[]> {
        console.log('getLocations');
        return this.dataService.getData(this.endpoint);
    }

    // Filter for Points
    getPoints(): Observable<any[]> {
        return this.getLocations().pipe(
            map(locations =>
                locations.filter(location => location?.geometry?.type === 'Point')
            )
        );
    }

    // Filter for LineStrings
    getLineStrings(): Observable<any[]> {
        return this.getLocations().pipe(
            map(locations =>
                locations.filter(location => location?.geometry?.type === 'LineString')
            )
        );
    }

    // Filter for Polygons
    getPolygons(): Observable<any[]> {
        return this.getLocations().pipe(
            map(locations =>
                locations.filter(location => location?.geometry?.type === 'Polygon')
            )
        );
    }

    refreshLocations(): Observable<Location[]> {
        return this.dataService.refreshData(this.endpoint);
    }

    clearLocationsCache(): void {
        this.dataService.clearCache(this.endpoint);
    }
}
