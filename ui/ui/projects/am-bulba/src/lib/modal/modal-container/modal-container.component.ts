import { Component, HostBinding, Inject, OnDestroy, ViewChild, ViewContainerRef } from '@angular/core';
import { ModalContainer } from "../modal-container.model";
import { ModalContext } from "../modal-context.model";
import { animate, animateChild, query, style, transition, trigger } from "@angular/animations";
import { DOCUMENT } from "@angular/common";

const animations = [
  trigger('host', [
    transition(':leave', [
      query('@backdrop,@box', [
        animateChild(),
      ]),
    ]),
    transition(':enter', [
      query('@backdrop,@box', [
        animateChild(),
      ]),
    ]),
  ]),
  trigger('box', [
    transition(':enter', [
      style({
        transform: 'translateY(40px)',
        opacity: 0
      }),
      animate('160ms cubic-bezier(.4,0,.2,1)', style({
        transform: 'translateY(0)',
        opacity: 1,
      })),
    ]),
  ]),
  trigger('backdrop', [
    transition(':enter', [
      style({
        opacity: 0,
      }),
      animate('120ms ease-in', style({
        opacity: 1,
      })),
    ]),
  ]),
];

@Component({
  template: `
      <div class="modal modal-open" [@backdrop] (click)="close()">
          <div [@box] class="modal-box" (click)="$event.stopPropagation()">
              <ng-template #modalContainer></ng-template>
          </div>
      </div>
  `,
  animations,
})
export class ModalContainerComponent implements ModalContainer, OnDestroy {

  @HostBinding('@host')
  host: any;

  @ViewChild('modalContainer', {read: ViewContainerRef})
  container!: ViewContainerRef;

  context!: ModalContext<any>;

  constructor(
    @Inject(DOCUMENT) private doc: Document
  ) {
    this.doc.documentElement.classList.add('overflow-hidden');
  }

  close() {
    return this.context?.close()
  }

  ngOnDestroy() {
    this.doc.documentElement.classList.remove('overflow-hidden');
  }
}
