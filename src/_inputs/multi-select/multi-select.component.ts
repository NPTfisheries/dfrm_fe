import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { BackendService } from 'src/_services/backend.service';
import { User } from 'src/_models/user';

@Component({
  selector: 'app-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultiSelectComponent),
      multi: true,
    },
  ],
})
export class MultiSelectComponent implements OnInit, ControlValueAccessor {
  @Input() label: string = '';
  selectedIds: number[] = []; // Changed to an array of selected IDs
  users: User[] = [];

  // Implement ControlValueAccessor methods
  onChange: any = () => {};
  onTouch: any = () => {};

  writeValue(value: any): void {
    if (Array.isArray(value)) {
      this.selectedIds = value;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  constructor(private backendService: BackendService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.backendService.getUsers().subscribe((users) => {
      console.log('multi-select!', users);
      this.users = users;
    });
  }

  // Handle multiple selections
  onSelectionChange(): void {
    this.onChange(this.selectedIds);
    this.onTouch();
  }
}
