import {
  Component,
  HostBinding,
  Inject,
  Input,
  OnDestroy,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { ModalContainer } from '../modal-container.model';
import { ModalContext } from '../modal-context.model';
import { animate, animateChild, query, style, transition, trigger } from '@angular/animations';
import { DOCUMENT } from '@angular/common';

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
        transform: 'translateY(80px)',
        opacity: 0
      }),
      animate('220ms cubic-bezier(.4,0,.2,1)', style({
        transform: 'translateY(0)',
        opacity: 1,
      })),
    ]),
    transition(':leave', [
      style({
        transform: 'translateY(0)',
        opacity: 1,
      }),
      animate('100ms cubic-bezier(.4,0,.2,1)', style({
        transform: 'translateY(-40px)',
        opacity: 0
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
    transition(':leave', [
      style({
        opacity: 1,
      }),
      animate('90ms ease-in', style({
        opacity: 0,
      })),
    ]),
  ]),
];

@Component({
  template: `
    <div class="modal modal-open" [@backdrop] (click)="close()">
      <div
        class="modal-box rounded-md"
        [ngClass]="bgClass"
        (click)="$event.stopPropagation()"

        [@box]
        *ngIf="isShow"
        (@box.done)="!isShow && emitClose()"
      >
        <ng-template #modalContainer></ng-template>
      </div>
    </div>
  `,
  styleUrls: ['./modal-container.component.scss'],
  animations,
})
export class ModalContainerComponent implements ModalContainer, OnDestroy {

  isShow = true;

  @Input() bgClass = 'bg-base-100';

  @HostBinding('@host')
  host: any;

  @ViewChild('modalContainer', {read: ViewContainerRef})
  container!: ViewContainerRef;

  context!: ModalContext<any>;
  closeData: any;

  constructor(
    @Inject(DOCUMENT) private doc: Document
  ) {
    this.doc.documentElement.classList.add('overflow-hidden');
  }

  close(data?: any) {
    if (data) {
      this.closeData = data;
    }
    this.isShow = false;
  }

  emitClose() {
    return this.context?.destroy(this.closeData);
  }

  ngOnDestroy() {
    this.doc.documentElement.classList.remove('overflow-hidden');
  }
}
