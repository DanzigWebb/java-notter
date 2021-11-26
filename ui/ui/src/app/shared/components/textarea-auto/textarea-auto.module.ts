import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextareaAutoDirective } from './textarea-auto.directive';
import { TextareaAutoComponent } from './textarea-auto/textarea-auto.component';



@NgModule({
  declarations: [
    TextareaAutoDirective,
    TextareaAutoComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TextareaAutoDirective,
    TextareaAutoComponent,
  ]
})
export class TextareaAutoModule { }
