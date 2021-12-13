import { AfterContentInit, Component, ContentChild, InjectionToken, OnInit } from '@angular/core';
import { NgControl } from "@angular/forms";
import { animationError } from "./form-field.animation";
import { AmFormFieldControl } from "../form-field.type";


export const AM_FORM_GROUP = new InjectionToken<FormFieldComponent>('AmFormGroup');

@Component({
  selector: 'am-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.css'],
  providers: [
    {
      provide: AM_FORM_GROUP,
      useExisting: FormFieldComponent,
    },
  ],
  animations: [
    ...animationError,
  ],
})
export class FormFieldComponent implements OnInit, AfterContentInit {

  isLoading = false;
  control: NgControl | null = null;

  @ContentChild(AmFormFieldControl) formControl!: AmFormFieldControl;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterContentInit() {
    this.findControl();
  }

  findControl() {
    this.control = this.formControl.control;
  }
}
