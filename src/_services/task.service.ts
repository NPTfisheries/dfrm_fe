import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { Observable, map } from 'rxjs';
import { Task, LookUp } from 'src/_models/interfaces';

@Injectable({
    providedIn: 'root'
})
export class TaskService {
    private readonly endpoint = 'tasks';

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

    // FIXX X X X --- show_on_website or whatever
    getTasksByProjectId(project_id: number | string): Observable<Task[] > {
        console.log(`getTasksByProjectId: ${project_id}`);
        return this.getTasks().pipe(
            map((tasks: any[]) => tasks.filter(task => task.project.id == String(project_id) && task.is_active))
        );
    }

    refreshTasksByProjectId(subproject_id: number | string): Observable<Task[] | undefined> {
        console.log(`getTasksBySubprojectId: ${subproject_id}`);
        return this.refreshTasks().pipe(
            map((tasks: Task[]) => tasks.filter(task => task.project == String(subproject_id) && task.is_active))
        );
    }

    refreshTasks(): Observable<Task[]> {
        return this.dataService.refreshData(this.endpoint);
    }

    clearTasksCache(): void {
        this.dataService.clearCache(this.endpoint);
    }
}
