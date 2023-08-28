import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailSubprojectComponent } from './detail-subproject.component';

describe('DetailSubprojectComponent', () => {
  let component: DetailSubprojectComponent;
  let fixture: ComponentFixture<DetailSubprojectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailSubprojectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailSubprojectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
