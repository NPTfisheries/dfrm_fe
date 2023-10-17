import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailMapComponent } from './detail-map.component';

describe('DetailMapComponent', () => {
  let component: DetailMapComponent;
  let fixture: ComponentFixture<DetailMapComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailMapComponent]
    });
    fixture = TestBed.createComponent(DetailMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
