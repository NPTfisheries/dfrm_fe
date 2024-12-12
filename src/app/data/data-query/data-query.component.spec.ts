import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataQueryComponent } from './data-query.component';

describe('DataQueryComponent', () => {
  let component: DataQueryComponent;
  let fixture: ComponentFixture<DataQueryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DataQueryComponent]
    });
    fixture = TestBed.createComponent(DataQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
