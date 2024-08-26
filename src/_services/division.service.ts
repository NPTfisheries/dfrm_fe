import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { Observable } from 'rxjs';
import { Division } from 'src/_models/division';

@Injectable({
  providedIn: 'root'
})
export class DivisionService {
  private readonly endpoint = 'division';

  constructor(private dataService: DataService<Division>) { }

  getDivisions(): Observable<Division[]> {
    console.log('getDivisions called');
    return this.dataService.getData(this.endpoint);
  }

  refreshDivisions(): Observable<Division[]> {
    return this.dataService.refreshData(this.endpoint);
  }

  clearDivisionsCache(): void {
    this.dataService.clearCache(this.endpoint);
  }
}
