import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { map, Observable } from 'rxjs';
import { Lookup } from 'src/_models/interfaces';

@Injectable({
    providedIn: 'root'
})
export class LookupService {
    private readonly endpoint = 'lookup';

    constructor(private dataService: DataService<Lookup>) { }

    getLookups(): Observable<Lookup[]> {
        console.log('getLookups');
        return this.dataService.getData(this.endpoint);
    }

    getLookupsByObjectType(object_type: string) {
        return this.getLookups().pipe(
            map((lookups: Lookup[]) => lookups.filter(lookup => lookup.object_type == object_type))
        );
    }

    refreshLookups(): Observable<Lookup[]> {
        return this.dataService.refreshData(this.endpoint);
    }

    clearLookupsCache(): void {
        this.dataService.clearCache(this.endpoint);
    }
}
