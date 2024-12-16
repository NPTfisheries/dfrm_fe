import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvasiveSpeciesComponent } from './invasive-species.component';

describe('InvasiveSpeciesComponent', () => {
  let component: InvasiveSpeciesComponent;
  let fixture: ComponentFixture<InvasiveSpeciesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InvasiveSpeciesComponent]
    });
    fixture = TestBed.createComponent(InvasiveSpeciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
