import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilityPopupComponent } from './facility-popup.component';

describe('FacilityPopupComponent', () => {
  let component: FacilityPopupComponent;
  let fixture: ComponentFixture<FacilityPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FacilityPopupComponent]
    });
    fixture = TestBed.createComponent(FacilityPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
