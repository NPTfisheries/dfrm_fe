import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { Observable, map } from 'rxjs';
import { Project } from 'src/_models/project';

@Injectable({
    providedIn: 'root'
})
export class ProjectService {
    private readonly endpoint = 'project';

    constructor(private dataService: DataService<Project>) { }

    getProjects(): Observable<Project[]> {
        console.log('getProjects');
        return this.dataService.getData(this.endpoint);
    }

    getProjectBySlug(slug: string): Observable<Project | undefined> {
        // console.log('getProjectBySlug');
        return this.getProjects().pipe(
            map((projects: Project[]) => projects.find(project => project.slug == slug))
        )
    }

    refreshProjects(): Observable<Project[]> {
        return this.dataService.refreshData(this.endpoint);
    }

    clearProjectsCache(): void {
        this.dataService.clearCache(this.endpoint);
    }
}
