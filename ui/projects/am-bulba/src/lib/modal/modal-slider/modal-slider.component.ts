import { AfterViewInit, Component, ElementRef, Inject, ViewChild, } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { animateChild, query, transition, trigger } from '@angular/animations';
import { backdrop, modalSlide } from '../modal.animations';
import { ModalContainerAbstract } from '../modal-container';

@Component({
  selector: 'app-modal-slider',
  styleUrls: ['./modal-slider.component.scss'],
  animations: [
    trigger('host', [
      transition(':leave', [
        query('@backdrop,@modalSlide', [
          animateChild(),
        ]),
      ]),
      transition(':enter', [
        query('@backdrop,@modalSlide', [
          animateChild(),
        ]),
      ]),
    ]),
    modalSlide,
    backdrop
  ],
  template: `
    <div class="modal modal-open" (click)="close()" [@backdrop]>
      <div
        #box
        class="ms-box bg-base-200 rounded-lg shadow-lg ring-1 ring-base-100 w-full md:w-6/12 lg:w-4/12"
        (click)="$event.stopPropagation()"

        [@modalSlide]
        *ngIf="isShow"
        (@modalSlide.done)="!isShow && emitClose()"
      >
        <div
          #control
          style="touch-action: none"
          class="flex p-3 py-5 md:py-3 justify-center items-center cursor-move control"
          (pointerdown)="onMouseDown($event); control.setPointerCapture($event.pointerId)"
          (pointermove)="move($event)"
          (pointerup)="end()"
          (dblclick)="setMaxHeight()"
        >
          <div class="border-2 rounded-md w-32"></div>
        </div>
        <div class="overflow-y-auto h-full">
          <ng-template #modalContainer></ng-template>
        </div>
      </div>
    </div>
  `,
})
export class ModalSliderComponent extends ModalContainerAbstract implements AfterViewInit {

  @ViewChild('box') box!: ElementRef;

  private isDrag = false;
  private startY = 0;
  private startHeight = 0;

  private currentHeight = 0;

  get windowHeight() {
    return this.doc.body.offsetHeight;
  }

  constructor(
    @Inject(DOCUMENT) public doc: Document
  ) {
    super(doc);
  }

  ngAfterViewInit() {
    this.setStartHeight();
  }

  setStartHeight() {
    this.currentHeight = this.windowHeight / 2;
    this.box.nativeElement.style.height = this.currentHeight + 'px';
  }

  setMaxHeight() {
    this.currentHeight = this.windowHeight - 8;
    this.box.nativeElement.style.height = this.currentHeight + 'px';
  }

  onMouseDown(e: PointerEvent) {
    e.preventDefault();
    this.start(e);
  }

  start(e: PointerEvent): void {
    this.startHeight = parseInt(getComputedStyle(this.box.nativeElement, null).height);
    this.startY = e.clientY;
    this.isDrag = true;
  }

  move(e: PointerEvent): void {
    if (this.isDrag) {
      this.currentHeight = this.calculateHeight(e);
      this.box.nativeElement.style.height = `${this.currentHeight}px`;
    }
  }

  end(): void {
    this.isDrag = false;
    this.fixedState();
  }

  private fixedState() {
    if (this.currentHeight > this.windowHeight * 0.7) {
      this.lazyFixHeight(this.setMaxHeight);
    } else if (this.currentHeight <= this.windowHeight * 0.7 && this.currentHeight >= this.windowHeight * 0.25) {
      this.lazyFixHeight(this.setStartHeight);
    } else if (this.currentHeight < this.windowHeight * 0.25) {
      this.close();
    }
  }

  private lazyFixHeight(cb: () => void, duration = 440) {
    this.setTransition(duration);

    cb.call(this);

    setTimeout(() => {
      this.removeTransition();
    }, duration);
  }

  private setTransition(duration: number) {
    this.box.nativeElement.style.transition = `${duration}ms cubic-bezier(0.6, -0.25, 0.2, 1.3)`;
  }

  private removeTransition() {
    this.box.nativeElement.style.transition = null;
  }

  private calculateHeight(e: PointerEvent): number {
    return this.startHeight - e.clientY + this.startY;
  };
}
