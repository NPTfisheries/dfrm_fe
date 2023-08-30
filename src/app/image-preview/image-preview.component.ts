import { Component, Input, AfterViewInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-image-preview',
  templateUrl: './image-preview.component.html',
  styleUrls: ['./image-preview.component.css']
})
export class ImagePreviewComponent implements AfterViewInit {

  @Input() imageUrl!: string | undefined;
  isContentCentered = false;

  constructor(
    private elementRef: ElementRef,
  ) { }

  ngAfterViewInit(): void {
    const image = new Image();
    image.src = this.imageUrl || '';
    image.onload = () => {
      this.isContentCentered = true;
    };
  }

  private centerContent() {
    const modalContent = this.elementRef.nativeElement.querySelector('.modal-content');
    if (modalContent) {
      modalContent.style.display = 'flex';
      modalContent.style.justifyContent = 'center';
      modalContent.style.alignItems = 'center';
    }
  }

}
