import { Directive, ElementRef, Input, OnDestroy, OnInit, Optional, Self } from '@angular/core';
import { NgControl } from "@angular/forms";
import { Subject } from "rxjs";
import { AmFormFieldControl, FormInputSize } from "../form-field.type";


@Directive({
  selector: 'input[amInput]',
  exportAs: 'amInput',
  providers: [
    {
      provide: AmFormFieldControl,
      useExisting: InputDirective,
    },
  ],
  host: {
    'class': 'input',
    '[class.input-error]': 'control?.invalid && control?.touched',
    '[class.input-bordered]': 'bordered',
    '[class.input-ghost]': 'ghost',

    '[class.input-xs]': 'size === "xs"',
    '[class.input-sm]': 'size === "sm"',
    '[class.input-md]': 'size === "md"',
    '[class.input-lg]': 'size === "lg"',
  },
})
export class InputDirective implements OnInit, OnDestroy, AmFormFieldControl {

  control: NgControl;

  @Input() bordered = false;
  @Input() ghost = false;
  @Input() size: FormInputSize = '';

  private destroy$ = new Subject();

  constructor(
    protected elementRef: ElementRef<HTMLInputElement>,
    @Optional() @Self() control: NgControl,
  ) {
    this.control = control;
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
