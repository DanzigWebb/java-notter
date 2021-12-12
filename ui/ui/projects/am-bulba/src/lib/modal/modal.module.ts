import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ModalContainerComponent } from './modal-container/modal-container.component';
import { ModalService } from "./modal.service";


@NgModule({
  declarations: [
    ModalContainerComponent,
  ],
  entryComponents: [
    ModalContainerComponent,
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
  ],
})
export class ModalModule {
}
