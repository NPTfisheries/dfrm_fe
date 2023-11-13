import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentPreviewComponent } from './document-preview-renderer.component';

describe('DocumentPreviewComponent', () => {
  let component: DocumentPreviewComponent;
  let fixture: ComponentFixture<DocumentPreviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DocumentPreviewComponent]
    });
    fixture = TestBed.createComponent(DocumentPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
