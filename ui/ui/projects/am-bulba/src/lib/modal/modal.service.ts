import {
  ApplicationRef,
  ComponentFactory,
  ComponentFactoryResolver,
  Injectable,
  ReflectiveInjector,
  Type,
} from '@angular/core';
import { ModalContainerComponent } from "./modal-container/modal-container.component";
import { ModalContext } from "./modal-context.model";
import { Observable } from "rxjs";

interface ModalOptions {
  hideOnBackdropClick?: boolean;
  containerType: Type<any>;
}

const defaultOptions = {
  hideOnBackdropClick: true,
  containerType: ModalContainerComponent,
};

@Injectable({
  providedIn: 'root',
})
export class ModalService {

  private modalContainer!: HTMLElement;
  private modalContainerFactory!: ComponentFactory<ModalContainerComponent>;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
  ) {
    this.setupModalContainerFactory();
  }

  open<T = any>(type: Type<any>, data?: any, options: ModalOptions = defaultOptions): Observable<T> {

    this.setupModalContainer();

    const modalContainerRef = this.appRef.bootstrap(this.modalContainerFactory, this.modalContainer);
    const viewContainerRef = modalContainerRef.instance.container;

    // Todo: заменить на то что не устарело
    const injector = ReflectiveInjector.resolveAndCreate([ModalContext], viewContainerRef.injector);
    const context = <ModalContext<any, T>>injector.get(ModalContext);
    context.data = data;

    // Create component of modal into modalContainer
    viewContainerRef.clear();
    const factory = this.componentFactoryResolver.resolveComponentFactory(type);
    viewContainerRef.createComponent(factory, 0, injector);

    context.componentRef = modalContainerRef;
    context.containerRef = viewContainerRef;

    if (!options || options.hideOnBackdropClick) {
      modalContainerRef.instance.context = context;
    }

    return <Observable<T>>context.opened$.asObservable();
  }

  private setupModalContainer(): void {
    this.modalContainer = document.createElement('div');
    document.getElementsByTagName('body')[0].appendChild(this.modalContainer);
  }

  private setupModalContainerFactory(): void {
    this.modalContainerFactory = this.componentFactoryResolver.resolveComponentFactory(ModalContainerComponent);
  }
}
