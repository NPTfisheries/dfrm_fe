import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooleanRendererComponent } from './boolean-renderer.component';

describe('BooleanRendererComponent', () => {
  let component: BooleanRendererComponent;
  let fixture: ComponentFixture<BooleanRendererComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BooleanRendererComponent]
    });
    fixture = TestBed.createComponent(BooleanRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
