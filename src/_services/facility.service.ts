import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { map, Observable } from 'rxjs';
import { Facility } from 'src/_models/interfaces';
import { LookUp } from 'src/_models/interfaces';
import { LookUpService } from './lookup.service';

@Injectable({
    providedIn: 'root'
})
export class FacilityService {
    private readonly endpoint = 'facilities';

    constructor(
        private dataService: DataService<Facility>,
        private lookupService: LookUpService
    ) { }

    getFacilities(): Observable<Facility[]> {
        console.log('getFacilities');
        return this.dataService.getData(this.endpoint);
    }

    getFacilityTypes(): Observable<LookUp[]> {
        return this.lookupService.getLookUpsByObjectType('Facility')
    }

    getFacilityBySlug(slug: string): Observable<Facility | undefined> {
        // console.log('getFacilityBySlug');
        return this.getFacilities().pipe(
            map((facilities: Facility[]) => facilities.find(facility => facility?.slug == slug))
        )
    }

    refreshFacilities(): Observable<Facility[]> {
        return this.dataService.refreshData(this.endpoint);
    }

    clearFacilitiesCache(): void {
        this.dataService.clearCache(this.endpoint);
    }
}
