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

    // getLocationsByGeomType(object_type: string) {
    //     return this.getLocations().pipe(
    //         map((locations: Location[]) => locations.filter(location => location.object_type == object_type))
    //     );
    // }

    refreshLocations(): Observable<Location[]> {
        return this.dataService.refreshData(this.endpoint);
    }

    clearLocationsCache(): void {
        this.dataService.clearCache(this.endpoint);
    }
}
