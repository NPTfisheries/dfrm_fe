import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityEditRendererComponent } from './activity-edit-renderer.component';

describe('ActivityEditRendererComponent', () => {
  let component: ActivityEditRendererComponent;
  let fixture: ComponentFixture<ActivityEditRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivityEditRendererComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivityEditRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
