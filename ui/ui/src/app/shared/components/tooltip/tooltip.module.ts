import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Tooltip } from "./tooltip";


@NgModule({
  declarations: [
    Tooltip,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    Tooltip,
  ],
})
export class TooltipModule {
}
