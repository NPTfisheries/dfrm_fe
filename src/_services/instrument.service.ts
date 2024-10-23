import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { map, Observable } from 'rxjs';
import { Instrument } from 'src/_models/interfaces';
import { LookUp } from 'src/_models/interfaces';
import { LookUpService } from './lookup.service';

@Injectable({
    providedIn: 'root'
})
export class InstrumentService {
    private readonly endpoint = 'instruments';

    constructor(
        private dataService: DataService<Instrument>,
        private lookupService: LookUpService,
    ) { }

    getInstruments(): Observable<Instrument[]> {
        console.log('getInstruments');
        return this.dataService.getData(this.endpoint);
    }

    getInstrumentsByTypeId(instrument_type_id: number | string): Observable<Instrument[]> {
        console.log(`getInstrumentsByTypeId: ${instrument_type_id}`);
        return this.getInstruments().pipe(
            map((instruments: any[]) => instruments.filter(instrument => instrument.instrument_type.id == instrument_type_id))
        );
    }

    getInstrumentTypes(): Observable<LookUp[]> {
        console.log('getInstrumentTypes');
        return this.lookupService.getLookUpsByObjectType('Instrument')
    }


    refreshInstruments(): Observable<Instrument[]> {
        return this.dataService.refreshData(this.endpoint);
    }

    clearInstrumentsCache(): void {
        this.dataService.clearCache(this.endpoint);
    }
}
