import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToggleButtonsComponent } from './toggle-buttons.component';
import { ToggleButtonsGroupDirective } from './toggle-buttons-group.directive';

@NgModule({
  declarations: [
    ToggleButtonsComponent,
    ToggleButtonsGroupDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ToggleButtonsComponent,
    ToggleButtonsGroupDirective
  ]
})
export class ToggleButtonsModule { }
