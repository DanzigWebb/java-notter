import {
  Component, Inject,
} from '@angular/core';
import { ModalContainer } from '../modal-container.model';
import { animateChild, query, transition, trigger } from '@angular/animations';
import { backdrop, modalDefault } from '../modal.animations';
import { ModalContainerAbstract } from '../modal-container';
import { DOCUMENT } from '@angular/common';

const animations = [
  trigger('host', [
    transition(':leave', [
      query('@backdrop,@modalDefault', [
        animateChild(),
      ]),
    ]),
    transition(':enter', [
      query('@backdrop,@modalDefault', [
        animateChild(),
      ]),
    ]),
  ]),
  modalDefault,
  backdrop,
];

@Component({
  template: `
    <div class="modal modal-open" [@backdrop] (click)="close()">
      <div
        class="modal-box rounded-md"
        [ngClass]="bgClass"
        (click)="$event.stopPropagation()"

        *ngIf="isShow"
        [@modalDefault]
        (@modalDefault.done)="!isShow && emitClose()"
      >
        <ng-template #modalContainer></ng-template>
      </div>
    </div>
  `,
  styleUrls: ['./modal-container.component.scss'],
  animations,
})
export class ModalContainerComponent extends ModalContainerAbstract implements ModalContainer {
  constructor(
    @Inject(DOCUMENT) public doc: Document
  ) {
    super(doc);
  }
}
