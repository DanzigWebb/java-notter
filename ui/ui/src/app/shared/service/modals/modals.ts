import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ModalContext } from 'am-bulba';
import { ModalsData } from '@app/shared/service/modals/modals.type';


@Component({
  template: `
    <h3 class="text-2xl mb-4">Подтверждение</h3>
    <p>{{message}}</p>
    <div class="modal-action mt-4">
      <button #submit type="button" class="btn btn-primary" (click)="close(true)">Подтвердить</button>
      <button type="button" class="btn" (click)="close(false)">Отменить</button>
    </div>
  `
})
export class ModalSubmit implements AfterViewInit {

  @ViewChild('submit') submitBtn!: ElementRef;

  get message() {
    return this.context.data?.message;
  }

  constructor(
    public context: ModalContext<ModalsData>,
  ) {
  }

  ngAfterViewInit() {
    this.submitBtn.nativeElement.focus();
  }

  close(isSubmit: boolean) {
    this.context.close(isSubmit);
  }
}
