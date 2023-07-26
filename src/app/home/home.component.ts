import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  currentUser?: any;


  constructor( ) {
    const storedUser = localStorage.getItem('user');
    this.currentUser = storedUser ? JSON.parse(storedUser) : null;
   }

   clickFunc(){
    console.log('clickadoo');
    console.log(this.currentUser);
   }

}
