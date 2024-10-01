import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { Observable, map } from 'rxjs';
import { Task } from 'src/_models/task';
import { LookUp } from 'src/_models/interfaces';

@Injectable({
    providedIn: 'root'
})
export class TaskService {
    private readonly endpoint = 'task';

    constructor(private dataService: DataService<Task>) { }

    getTasks(): Observable<Task[]> {
        console.log('getTasks');
        return this.dataService.getData(this.endpoint);
    }

    getTaskTypes(): Observable<LookUp[]> {
        return this.dataService.getData('lookup').pipe(
            map((lookups: LookUp[]) => lookups.filter(lookup => lookup.object_type == 'Task'))
        );
    }

    getTasksBySubprojectId(subproject_id: number | string): Observable<Task[] | undefined> {
        console.log(`getTasksBySubprojectId: ${subproject_id}`);
        return this.getTasks().pipe(
            map((tasks: Task[]) => tasks.filter(task => task.subproject == String(subproject_id) && task.is_active))
        );
    }

    refreshTasksBySubprojectId(subproject_id: number | string): Observable<Task[] | undefined> {
        console.log(`getTasksBySubprojectId: ${subproject_id}`);
        return this.refreshTasks().pipe(
            map((tasks: Task[]) => tasks.filter(task => task.subproject == String(subproject_id) && task.is_active))
        );
    }

    refreshTasks(): Observable<Task[]> {
        return this.dataService.refreshData(this.endpoint);
    }

    clearTasksCache(): void {
        this.dataService.clearCache(this.endpoint);
    }
}
