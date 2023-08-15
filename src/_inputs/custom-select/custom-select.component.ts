import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { BackendService } from 'src/_services/backend.service';
import { User } from 'src/_models/user';

@Component({
  selector: 'app-custom-select',
  templateUrl: './custom-select.component.html',
  styleUrls: ['./custom-select.component.css']
})
export class CustomSelectComponent implements OnInit {

  selectedId!: number;
  users: User[] = [];


  constructor(
    private backendService: BackendService,
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.backendService.getUsers()
      .subscribe(users => {
        console.log('custom select!', users);
        this.users = users});
  }

}
