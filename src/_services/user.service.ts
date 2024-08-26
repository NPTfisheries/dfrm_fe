import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { Observable } from 'rxjs';
import { User } from 'src/_models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly endpoint = 'users';

  constructor(private dataService: DataService<User>) { }

  getUsers(): Observable<User[]> {
    console.log('getUsers');
    return this.dataService.getData(this.endpoint);
  }

  refreshUsers(): Observable<User[]> {
    return this.dataService.refreshData(this.endpoint);
  }

  clearUsersCache(): void {
    this.dataService.clearCache(this.endpoint);
  }
}
