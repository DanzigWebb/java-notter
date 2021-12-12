import { ComponentRef, Injectable, ViewContainerRef } from "@angular/core";
import { Subject } from "rxjs";

@Injectable()
export class ModalContext<T, Y = any> {

  opened$ = new Subject<Y>();

  componentRef!: ComponentRef<any>;
  containerRef!: ViewContainerRef;

  data?: T;

  constructor() { }

  private hide() {
    this.containerRef.remove(0);
    this.componentRef.destroy();
    this.opened$.complete();
  }

  close(...args: any[]) {
    this.opened$.next(...args);
    this.hide();
  }

  error(reason: any) {
    this.opened$.error(reason);
    this.hide();
  }
}
