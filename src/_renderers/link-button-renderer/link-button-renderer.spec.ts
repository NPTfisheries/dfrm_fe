import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkButtonRendererComponent } from './link-button-renderer.component';

describe('LinkButtonRendererComponent', () => {
  let component: LinkButtonRendererComponent;
  let fixture: ComponentFixture<LinkButtonRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinkButtonRendererComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LinkButtonRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
