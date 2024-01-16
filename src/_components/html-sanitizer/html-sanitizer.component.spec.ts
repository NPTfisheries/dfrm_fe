import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HtmlSanitizerComponent } from './html-sanitizer.component';

describe('HtmlSanitizerComponent', () => {
  let component: HtmlSanitizerComponent;
  let fixture: ComponentFixture<HtmlSanitizerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HtmlSanitizerComponent]
    });
    fixture = TestBed.createComponent(HtmlSanitizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
