import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { map, Observable } from 'rxjs';
import { LookUp } from 'src/_models/interfaces';

@Injectable({
    providedIn: 'root'
})
export class LookUpService {
    private readonly endpoint = 'LookUp';

    constructor(private dataService: DataService<LookUp>) { }

    getLookUps(): Observable<LookUp[]> {
        console.log('getLookUps');
        return this.dataService.getData(this.endpoint);
    }

    getLookUpsByObjectType(object_type: string) {
        return this.getLookUps().pipe(
            map((LookUps: LookUp[]) => LookUps.filter(LookUp => LookUp.object_type == object_type))
        );
    }

    refreshLookUps(): Observable<LookUp[]> {
        return this.dataService.refreshData(this.endpoint);
    }

    clearLookUpsCache(): void {
        this.dataService.clearCache(this.endpoint);
    }
}
