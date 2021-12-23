import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ModalContainerComponent } from './modal-container/modal-container.component';
import { ModalService } from "./modal.service";
import { ModalSliderComponent } from './modal-slider/modal-slider.component';


@NgModule({
  declarations: [
    ModalContainerComponent,
    ModalSliderComponent
  ],
  entryComponents: [
    ModalContainerComponent,
    ModalSliderComponent
  ],
  providers: [
    ModalService,
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
  ],
  exports: [
    ModalContainerComponent,
    ModalSliderComponent
  ],
})
export class ModalModule {
}
