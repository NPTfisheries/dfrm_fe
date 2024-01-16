import { Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-html-sanitizer',
  template: '<div [innerHTML]="transformHTML(this.html)" [class]="class"></div>'
})
export class HtmlSanitizerComponent {
  String = String;

  @Input() html!: String | undefined;
  @Input() class!: String | undefined;

  constructor(
    public sanitizer: DomSanitizer, 
  ) { }

  transformHTML(html: any) {
    return this.sanitizer.bypassSecurityTrustHtml(String(html))
  }

}
