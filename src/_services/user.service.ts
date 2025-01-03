import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { map, Observable } from 'rxjs';
import { User } from 'src/_models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly endpoint = 'users';

  constructor(private dataService: DataService<User>) { }

  getUsers(): Observable<User[]> {
    // console.log('getUsers');
    return this.dataService.getData(this.endpoint);
  }

  getCurrentUser() {
    return this.dataService.getItem('user', '');
  }

  refreshCurrentUser() {
    return this.dataService.refreshItem('user', '');
  }

  getUserById(id: number | string) {
    return this.getUsers().pipe(
      map((users: User[]) => users.find(user => user.id == id))
    );
  }

  refreshUsers(): Observable<User[]> {
    return this.dataService.refreshData(this.endpoint);
  }

  clearUsersCache(): void {
    this.dataService.clearCache(this.endpoint);
  }
}
