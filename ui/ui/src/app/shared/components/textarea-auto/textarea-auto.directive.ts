import { Directive, ElementRef, EventEmitter, Output } from '@angular/core';

@Directive({
  selector: '[appTextareaAuto]',
  host: {
    'class': 'textarea textarea-ghost w-full resize-none leading-5 min-h-0 overflow-y-hidden px-1 py-1',
    'rows': '1',
    '(input)': 'onInput.emit(ref.value)'
  }
})
export class TextareaAutoDirective {

  get ref(): HTMLTextAreaElement {
    return this.elementRef.nativeElement;
  }

  @Output() onInput = new EventEmitter<string>();

  constructor(
    private elementRef: ElementRef,
  ) {
  }
}
