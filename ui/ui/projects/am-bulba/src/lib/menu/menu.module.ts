import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuTriggerDirective } from './menu-trigger.directive';
import { MenuPanelComponent } from './menu-panel/menu-panel.component';



@NgModule({
  declarations: [
    MenuTriggerDirective,
    MenuPanelComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MenuTriggerDirective,
    MenuPanelComponent,
  ]
})
export class MenuModule { }
