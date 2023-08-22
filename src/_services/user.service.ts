import { Injectable } from "@angular/core";

import { User } from "src/_models/user";
import { BehaviorSubject, Observable, of, switchMap } from "rxjs";
import { BackendService } from "./backend.service";

@Injectable({ providedIn: 'root' })
export class UserService {

    url = '/api/v1/users/';

    currentUser$: Observable<User> = new Observable<User>;
    private userListSubject$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);;
    userList$: Observable<User[]> = this.userListSubject$.asObservable();

    constructor(
        private bs: BackendService,
    ) { }

    getUserList() {
        console.log('API CALL');
        this.bs.get(this.url).subscribe((users: any) => {
            this.userListSubject$.next(users);
        });
    }

    getCurrentUser() {
        return this.bs.get('/api/v1/user/').subscribe((currentUser: any) => {
            this.currentUser$ = currentUser;
        });
    }

    getUser(id: number): Observable<User | undefined> {
        if (this.userListSubject$.getValue().length === 0) { this.getUserList(); }

        return this.userList$.pipe(
            switchMap(users => {
                const user = users.find(u => u.id === String(id));
                return of(user);
            })
        );
    }

    getUserOptions(): Observable<{ key: string, value: string }[]> {
        if (this.userListSubject$.getValue().length === 0) { this.getUserList(); }

        return this.userList$.pipe(
            switchMap(users => {
                const options = users.map(u => ({ key: String(u.id), value: `${u.first_name} ${u.last_name}` }));
                return of(options);
            })
        );
    }

    // updateUser(user: User) {
    //     this.bs.put(this.url, user).subscribe(() => {
    //         const updatedList = this.userListSubject$.getValue().map(u => (u.id === user.id ? user : u));
    //         this.userListSubject$.next(updatedList);
    //     });
    // }

}