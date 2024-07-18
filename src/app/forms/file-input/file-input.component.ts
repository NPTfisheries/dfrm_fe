import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-file-input',
  templateUrl: './file-input.component.html'
})
export class FileInputComponent {
  @Input() validationErrorMessage: string = 'A file must be selected.';
  @Output() fileSelected = new EventEmitter<File | undefined>();

  selectedFile: File | undefined;

  onFileChange(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
      this.fileSelected.emit(this.selectedFile);
    } else {
      this.selectedFile = undefined;
      this.fileSelected.emit(undefined);
    }
  }
}
