import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { LookUpService } from './lookup.service';
import { Observable, map } from 'rxjs';
import { Task, LookUp } from 'src/_models/interfaces';

@Injectable({
    providedIn: 'root'
})
export class TaskService {
    private readonly endpoint = 'tasks';

    constructor(
        private dataService: DataService<Task>,
        private lookupService: LookUpService
    ) { }

    getTasks(): Observable<Task[]> {
        console.log('getTasks');
        return this.dataService.getData(this.endpoint);
    }

    getTaskTypes(): Observable<LookUp[]> {
        return this.lookupService.getLookUpsByObjectType('Task')
    }

    getTasksByProjectId(project_id: number | string): Observable<Task[]> {
        console.log(`getTasksByProjectId: ${project_id}`);
        return this.getTasks().pipe(
            map((tasks: any[]) => tasks.filter(task => task.project.id == String(project_id) && task.display))
        );
    }

    refreshTasksByProjectId(project_id: number | string): Observable<Task[] | undefined> {
        console.log(`getTasksByProjectId: ${project_id}`);
        return this.refreshTasks().pipe(
            map((tasks: Task[]) => tasks.filter(task => task.project == String(project_id) && task.display))
        );
    }

    refreshTasks(): Observable<Task[]> {
        return this.dataService.refreshData(this.endpoint);
    }

    clearTasksCache(): void {
        this.dataService.clearCache(this.endpoint);
    }
}
