import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { Observable } from 'rxjs';
import { InvasiveSpecies } from 'src/_models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class InvasivesService {
  private readonly endpoint = 'invasives';

  constructor(
    private dataService: DataService<InvasiveSpecies>,
  ) { }

  getInvasives(): Observable<InvasiveSpecies[]> {
    // console.log('getInvasives');
    return this.dataService.getData(this.endpoint);
  }

  refreshInvasives(): Observable<InvasiveSpecies[]> {
    return this.dataService.refreshData(this.endpoint);
  }

}