import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeometryWidgetComponent } from './geometry-widget.component';

describe('GeometryWidgetComponent', () => {
  let component: GeometryWidgetComponent;
  let fixture: ComponentFixture<GeometryWidgetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GeometryWidgetComponent]
    });
    fixture = TestBed.createComponent(GeometryWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
