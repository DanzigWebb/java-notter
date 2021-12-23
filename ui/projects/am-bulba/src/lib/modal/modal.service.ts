import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  Inject,
  Injectable,
  Injector,
  Type,
  ViewContainerRef,
} from '@angular/core';
import { ModalContainerComponent } from './modal-container/modal-container.component';
import { ModalContext } from './modal-context.model';
import { Observable } from 'rxjs';
import { DOCUMENT } from '@angular/common';

interface ModalOptions {
  hideOnBackdropClick?: boolean;
  containerType?: Type<any>;
  backgroundClass?: string;
}

const defaultOptions = {
  hideOnBackdropClick: true,
  containerType: ModalContainerComponent,
};

@Injectable({
  providedIn: 'root',
})
export class ModalService {

  constructor(
    private cfr: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    @Inject(DOCUMENT) private doc: Document,
  ) {
  }

  open<T = any>(type: Type<any>, data?: any, modalOptions: ModalOptions = defaultOptions): Observable<T> {

    const options = Object.assign({...defaultOptions}, modalOptions);

    const modalContainerRef: ComponentRef<any> = this.createWrapper(options.containerType);
    const viewContainerRef: ViewContainerRef = modalContainerRef.instance.container;

    const injector = Injector.create({
      providers: [{provide: ModalContext, useClass: ModalContext}],
      parent: viewContainerRef.injector
    });
    const context = injector.get(ModalContext);
    context.data = data;

    viewContainerRef.clear();
    const factory = this.cfr.resolveComponentFactory(type);
    viewContainerRef.createComponent(factory, 0, injector);

    context.componentRef = modalContainerRef;
    context.containerRef = viewContainerRef;
    modalContainerRef.instance.context = context;

    if (options.backgroundClass) {
      modalContainerRef.instance.bgClass = options.backgroundClass;
    }

    // Сообщаем обертке модального окна, что пора закрываться
    // Модальное окно будет закрыто после проигрывания анимации
    context.closeEmit$.subscribe((...data) => {
      modalContainerRef.instance.close(...data);
    });

    return <Observable<T>>context.opened$.asObservable();
  }

  private createWrapper<T = unknown>(componentWrapper: Type<T>) {
    const container = this.doc.createElement('div');
    this.doc.body.appendChild(container);
    const factory = this.cfr.resolveComponentFactory(componentWrapper);
    return this.appRef.bootstrap(factory, container);
  }
}
