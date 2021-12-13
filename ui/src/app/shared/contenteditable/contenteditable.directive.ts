import {
  Directive,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostListener,
  Input,
  OnInit,
  Output,
  Renderer2
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
  selector: '[contenteditable]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ContenteditableDirective),
      multi: true,
    },
  ],
  host: {
    'class': 'p-2 transition rounded-md',
  }
})
export class ContenteditableDirective implements OnInit, ControlValueAccessor {

  @Input() placeholder = '';

  @Output() focusChange = new EventEmitter<boolean>();

  constructor(
    private readonly elementRef: ElementRef,
    private readonly renderer: Renderer2,
  ) {
  }

  ngOnInit() {
    this.writeValue(this.placeholder)
  }

  @HostListener('focus')
  onFocus() {
    this.focusChange.emit(true);
  }

  @HostListener('input')
  onInput() {
    this.onChange(this.elementRef.nativeElement.innerHTML);
  }

  @HostListener('blur')
  onBlur() {
    this.focusChange.emit(false);
    this.onTouched();
  }

  setDisabledState(disabled: boolean) {
    this.renderer.setAttribute(
      this.elementRef.nativeElement,
      'contenteditable',
      String(!disabled),
    );
  }

  private onTouched = () => {
  };

  private onChange: (value: string) => void = () => {
  };

  registerOnChange(onChange: (value: string) => void) {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: () => void) {
    this.onTouched = onTouched;
  }

  writeValue(value: string) {
    const newValue = value
      ? ContenteditableDirective.normalizeValue(value)
      : this.placeholder

    this.renderer.setProperty(
      this.elementRef.nativeElement,
      'innerHTML',
      newValue,
    );
  }

  private static normalizeValue(value: string | null): string {
    return value || '';
  }
}
