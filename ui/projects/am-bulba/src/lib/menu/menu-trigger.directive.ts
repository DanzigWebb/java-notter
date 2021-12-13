import {
  Directive,
  ElementRef,
  EmbeddedViewRef,
  Inject,
  Input,
  NgZone,
  OnInit,
  ViewContainerRef,
} from '@angular/core';
import { MenuPanelComponent } from "./menu-panel/menu-panel.component";
import { createPopper, Instance, Placement } from "@popperjs/core";
import { DOCUMENT } from "@angular/common";


@Directive({
  selector: '[amMenuTrigger]',
  exportAs: 'amMenuTrigger',
  host: {
    '(click)': 'show()',
  },
})
export class MenuTriggerDirective implements OnInit {
  private _panelContent!: MenuPanelComponent;

  private view: EmbeddedViewRef<any> | null = null;
  private panelRef: HTMLElement | null = null;
  private popperRef: Instance | null = null;

  @Input() placement: Placement = 'bottom-start';
  @Input() autoWidth = false;

  private isOpen = false;

  @Input() set amMenuTrigger(panel: MenuPanelComponent) {
    this._panelContent = panel;
  }

  get panelContent() { return this._panelContent; }

  constructor(
    @Inject(DOCUMENT) private doc: Document,
    private vcr: ViewContainerRef,
    private el: ElementRef,
    private zone: NgZone,
  ) {
  }

  ngOnInit() {
    this.panelContent.onClose.subscribe(() => {
      this.close();
    });
  }

  show() {
    if (this.isOpen) {
      return;
    }
    const panelTpl = this.panelContent.panelContent;
    if (panelTpl) {
      this.view = this.vcr.createEmbeddedView(panelTpl);
      this.panelRef = <HTMLElement>this.view.rootNodes[0];
      const dropdown = <HTMLElement>this.panelRef.querySelector('.am-menu-panel-box');

      if (this.autoWidth) {
        dropdown.style.minWidth = this.el.nativeElement.scrollWidth + 'px';
      }

      this.doc.body.appendChild(this.panelRef);

      if (this.panelRef && dropdown) {
        this.createPopper(this.el.nativeElement, dropdown);
        this.isOpen = true;
      }
    }
  }

  close() {
    this.view?.destroy();
    this.panelRef?.remove();
    this.popperRef?.destroy();
    this.isOpen = false;
  }

  private createPopper(trigger: HTMLElement, panel: HTMLElement) {
    this.zone.runOutsideAngular(() => {
      this.popperRef = this.popperRef = createPopper(trigger, panel, {
        placement: this.placement,
        modifiers: [{
            name: 'offset',
            options: {
              offset: [0, 5],
            },
          }],
      });
    });
  }
}
