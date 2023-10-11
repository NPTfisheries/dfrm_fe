import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DivisionDetailComponent } from './division-detail.component';

describe('DivisionDetailComponent', () => {
  let component: DivisionDetailComponent;
  let fixture: ComponentFixture<DivisionDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DivisionDetailComponent]
    });
    fixture = TestBed.createComponent(DivisionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
