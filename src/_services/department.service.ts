import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { Observable } from 'rxjs';
import { Department } from 'src/_models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  private readonly endpoint = 'department';

  constructor(private dataService: DataService<Department>) { }

  getDepartments(): Observable<Department[]> {
    console.log('getDepartments called');
    return this.dataService.getData(this.endpoint);
  }

  refreshDepartments(): Observable<Department[]> {
    return this.dataService.refreshData(this.endpoint);
  }

  clearDepartmentsCache(): void {
    this.dataService.clearCache(this.endpoint);
  }
}
