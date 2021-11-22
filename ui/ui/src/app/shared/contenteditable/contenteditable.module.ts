import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContenteditableDirective } from './contenteditable.directive';


@NgModule({
  declarations: [
    ContenteditableDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ContenteditableDirective
  ]
})
export class ContenteditableModule {
}
