import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Editor, Toolbar } from 'ngx-editor';

import { InputBase } from 'src/_inputs/input-base';

//https://sibiraj-s.github.io/ngx-editor/

@Component({
  selector: 'app-rich-text-input',
  templateUrl: './rich-text-input.component.html',
  styleUrls: ['./rich-text-input.component.css'],
})
export class RichTextInputComponent implements OnInit, OnDestroy {
  @Input() input!: InputBase<string>;
  @Input() form!: FormGroup;

  editor!: Editor;
  html: string | undefined;

  constructor(
    ) {}

  toolbar: Toolbar = [
    ['bold', 'italic', 'underline'],
    ['blockquote', 'link'], // 'code',
    ['ordered_list', 'bullet_list'],
    // [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    // ['image', 'code'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];

  ngOnInit(): void {
    // console.log(this.input);
    this.editor = new Editor({
      content: this.input.value,
      keyboardShortcuts: true,
    });

    // console.log(this.editor);
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

}
