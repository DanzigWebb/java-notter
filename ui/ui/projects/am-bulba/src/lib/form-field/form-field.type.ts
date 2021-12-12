import { NgControl } from "@angular/forms";
import { Injectable } from "@angular/core";

@Injectable()
export abstract class AmFormFieldControl {
  /** Gets the NgControl for this control. */
  readonly control!: NgControl | null;
}


export type FormInputSize = 'xs' | 'sm' | 'md' | 'lg' | '';
