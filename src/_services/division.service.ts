import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { Observable } from 'rxjs';
import { Division } from 'src/_models/interfaces';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DivisionService {
  private readonly endpoint = 'division';

  constructor(
    private dataService: DataService<Division>,
    private http: HttpClient,
  ) { }

  getDivisions(): Observable<Division[]> {
    console.log('getDivisions');
    return this.dataService.getData(this.endpoint); // is_active??
  }

  getDivisionDetail(slug: string): Observable<Division | null> {
    console.log(`getDivisionDetail`);
    return this.dataService.getItem(this.endpoint, slug);
  }

  refreshDivisions(): Observable<Division[]> {
    return this.dataService.refreshData(this.endpoint);
  }

  clearDivisionsCache(): void {
    this.dataService.clearCache(this.endpoint);
  }

}