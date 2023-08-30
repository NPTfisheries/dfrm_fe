import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagePreviewRendererComponent } from './image-preview-renderer.component';

describe('ImagePreviewRendererComponent', () => {
  let component: ImagePreviewRendererComponent;
  let fixture: ComponentFixture<ImagePreviewRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImagePreviewRendererComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImagePreviewRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
