import { Component, OnDestroy, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { Event } from '@angular/router';
import { Validators, Editor, Toolbar } from 'ngx-editor';

import { InputBase } from 'src/_inputs/input-base';

//https://sibiraj-s.github.io/ngx-editor/

@Component({
  selector: 'app-rich-text-input',
  templateUrl: './rich-text-input.component.html',
  styleUrls: ['./rich-text-input.component.css'],
  // encapsulation: ViewEncapsulation.None,
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
    ['code', 'blockquote', 'link'],
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

  onChange(event: any) {
    // console.log(event);
    // console.log(event.target.innerHTML);
    // console.log(this.editor.view);
    this.form.get(this.input.key)?.patchValue(event.target.innerHTML);
  }

}
