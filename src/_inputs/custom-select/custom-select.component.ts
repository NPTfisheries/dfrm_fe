import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { BackendService } from 'src/_services/backend.service';
import { User } from 'src/_models/user';

@Component({
  selector: 'app-custom-select',
  templateUrl: './custom-select.component.html',
  styleUrls: ['./custom-select.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomSelectComponent),
      multi:true
    }
  ]
})
export class CustomSelectComponent implements OnInit, ControlValueAccessor {

  @Input() label: string = '';
  @Input() existingValue: number | null = null;
  @Input() controlName: string | null = null;

  selectedId!: number | null;
  users: User[] = [];

  // Implement ControlValueAccessor methods
  onChange: any = () => { };
  onTouch: any = () => { };

  writeValue(value: any): void {
    this.selectedId = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

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
        this.users = users;
        this.selectedId = this.existingValue;
      });
  }

}
