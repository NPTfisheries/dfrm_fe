import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { map, Observable } from 'rxjs';
import { Facility } from 'src/_models/interfaces';

@Injectable({
    providedIn: 'root'
})
export class FacilityService {
    private readonly endpoint = 'facility';

    constructor(private dataService: DataService<Facility>) { }

    getFacilities(): Observable<Facility[]> {
        console.log('getFacilities');
        return this.dataService.getData(this.endpoint);
    }

    getFacilityBySlug(slug: string): Observable<Facility | undefined> {
        // console.log('getFacilityBySlug');
        return this.getFacilities().pipe(
            map((facilities: Facility[]) => facilities.find(facility => facility?.properties?.slug == slug))
        )
    }

    refreshFacilities(): Observable<Facility[]> {
        return this.dataService.refreshData(this.endpoint);
    }

    clearFacilitiesCache(): void {
        this.dataService.clearCache(this.endpoint);
    }
}
