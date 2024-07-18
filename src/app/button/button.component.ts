import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {
  @Input() label!: string;
  @Input() loading = false;
  @Input() disabled = false;
  @Input() style?: { [klass: string]: any};

  buttonClasses = 'dfrm-button';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['disabled']) {
      this.buttonClasses = this.disabled ? 'dfrm-button' : 'dfrm-button grow';
    }
  }

}
