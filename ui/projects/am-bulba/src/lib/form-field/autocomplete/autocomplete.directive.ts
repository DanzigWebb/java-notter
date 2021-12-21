import {
  Directive,
  ElementRef,
  EmbeddedViewRef, EventEmitter,
  Inject,
  Input,
  NgZone,
  OnDestroy, OnInit, Optional, Output, Self,
  ViewContainerRef
} from '@angular/core';
import { AutocompletePanel } from './autocomplete-panel';
import { createPopper, Instance } from '@popperjs/core';
import { DOCUMENT } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NgControl } from '@angular/forms';
import { OptionComponent } from '../option/option.component';

@Directive({
  selector: '[amAutocomplete]',
  exportAs: 'amAutocomplete',
  host: {
    '(click)': 'show()'
  }
})
export class AutocompleteDirective implements OnInit, OnDestroy {

  @Input() amAutocomplete!: AutocompletePanel;

  @Output() onChange = new EventEmitter<any>();
  @Output() onOptionCheck = new EventEmitter<OptionComponent>()

  private view: EmbeddedViewRef<any> | null = null;
  private panelRef: HTMLElement | null = null;
  private popperRef: Instance | null = null;

  private isOpen = false;

  private destroy$ = new Subject();

  constructor(
    @Inject(DOCUMENT) private doc: Document,
    private vcr: ViewContainerRef,
    private el: ElementRef<HTMLInputElement>,
    private zone: NgZone,
    @Optional() @Self() private control: NgControl,
  ) {
  }

  ngOnInit() {
    this.amAutocomplete.onClose
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.destroy();
      });

    this.amAutocomplete.onChange
      .pipe(takeUntil(this.destroy$))
      .subscribe((option) => {
        const value = option.value || option.elementRef.nativeElement.innerText
        this.setValue(value);

        this.onChange.emit(value);
        this.onOptionCheck.emit(option);
        this.destroy();
      });
  }

  setValue(value: any) {
    if (this.control) {
      this.control.control?.setValue(value);
    }
  }

  show() {
    if (this.isOpen) {
      return;
    }

    const panelTpl = this.amAutocomplete.panelContent;
    if (panelTpl) {
      this.view = this.vcr.createEmbeddedView(panelTpl);
      this.panelRef = <HTMLElement>this.view.rootNodes[0];
      const dropdown = <HTMLElement>this.panelRef.querySelector('.autocomplete-dropdown');

      dropdown.style.minWidth = this.el.nativeElement.scrollWidth + 'px';

      this.doc.body.appendChild(this.panelRef);

      if (this.panelRef && dropdown) {
        this.createPopper(this.el.nativeElement, dropdown);
        this.isOpen = true;
      }
    }
  }

  private createPopper(trigger: HTMLElement, panel: HTMLElement) {
    this.zone.runOutsideAngular(() => {
      this.popperRef = this.popperRef = createPopper(trigger, panel, {
        modifiers: [{
          name: 'offset',
          options: {
            offset: [0, 5],
          },
        }],
      });
    });
  }

  destroy() {
    this.view?.destroy();
    this.panelRef?.remove();
    this.popperRef?.destroy();
    this.isOpen = false;
  }

  ngOnDestroy() {
    this.destroy();
    this.destroy$.next();
    this.destroy$.complete();
  }
}
