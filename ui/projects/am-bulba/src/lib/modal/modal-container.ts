import { Directive, HostBinding, Inject, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { ModalContext } from 'am-bulba';
import { DOCUMENT } from '@angular/common';
import { ModalContainer } from './modal-container.model';

@Directive()
export abstract class ModalContainerAbstract implements ModalContainer {

  isShow = true;

  @Input() bgClass = 'bg-base-100';

  @HostBinding('@host')
  host: any;

  @ViewChild('modalContainer', {read: ViewContainerRef})
  container!: ViewContainerRef;

  context!: ModalContext<any>;
  closeData: any;

  protected constructor(
    @Inject(DOCUMENT) public doc: Document
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
