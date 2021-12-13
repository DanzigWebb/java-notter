import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabComponent } from "./tab/tab.component";
import { TabsComponent } from "./tabs.component";
import { TabLabelComponent } from './tab-label/tab-label.component';



@NgModule({
  declarations: [TabComponent, TabsComponent, TabLabelComponent],
  imports: [
    CommonModule,
  ],
  exports: [TabsComponent, TabComponent, TabLabelComponent],
})
export class TabsModule {
}
