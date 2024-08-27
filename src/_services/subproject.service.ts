import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { Observable, map } from 'rxjs';
import { Subproject } from 'src/_models/subproject';

@Injectable({
    providedIn: 'root'
})
export class SubprojectService {
    private readonly endpoint = 'subproject';

    constructor(private dataService: DataService<Subproject>) { }

    getSubprojects(): Observable<Subproject[]> {
        console.log('getSubprojects');
        return this.dataService.getData(this.endpoint);
    }

    getSubprojectsByProjectId(project_id: number | string): Observable<Subproject[] | undefined> {
        // console.log(`getSubprojectsByProjectId: ${project_id}`);
        return this.getSubprojects().pipe(
            map((subprojects: Subproject[]) => subprojects.filter(subproject => subproject.project == String(project_id) && subproject.is_active))
        );
    }

    refreshSubprojectsByProjectId(project_id: number | string): Observable<Subproject[] | undefined> {
        // console.log(`refreshSubprojectsByProjectId: ${project_id}`);
        return this.refreshSubprojects().pipe(
            map((subprojects: Subproject[]) => subprojects.filter(subproject => subproject.project == String(project_id) && subproject.is_active))
        );
    }

    refreshSubprojects(): Observable<Subproject[]> {
        return this.dataService.refreshData(this.endpoint);
    }

    clearSubprojectsCache(): void {
        this.dataService.clearCache(this.endpoint);
    }
}
