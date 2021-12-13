import { ModalContext } from "./modal-context.model";
import { ViewContainerRef } from "@angular/core";

export interface ModalContainer {
  context: ModalContext<any>;
  container: ViewContainerRef;
}
