import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelComponent } from './panel.component';
import { PanelBlockComponent } from './panel-block/panel-block.component';


@NgModule({
  declarations: [
    PanelComponent,
    PanelBlockComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    PanelComponent,
    PanelBlockComponent,
  ],
})
export class PanelModule {
}
