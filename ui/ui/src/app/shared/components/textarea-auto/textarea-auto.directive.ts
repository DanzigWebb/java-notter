import { AfterViewInit, Directive, ElementRef, EventEmitter, OnDestroy, Optional, Output, Self } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Directive({
  selector: '[appTextareaAuto]',
  host: {
    'class': 'textarea textarea-ghost w-full resize-none leading-5 min-h-0 overflow-y-hidden px-1 py-1',
    'rows': '1',
    '(input)': 'onInput.emit(ref.value)',
  }
})
export class TextareaAutoDirective implements AfterViewInit, OnDestroy {

  get ref(): HTMLTextAreaElement {
    return this.elementRef.nativeElement;
  }

  @Output() onInput = new EventEmitter<string>();

  private destroy$ = new Subject();

  constructor(
    private elementRef: ElementRef,
    @Optional() @Self() private control: NgControl,
  ) {
  }

  ngAfterViewInit() {
    if (this.control) {
      this.control.control?.valueChanges
        .pipe(takeUntil(this.destroy$))
        .subscribe(data => {
          this.onInput.emit(data);
        });
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
