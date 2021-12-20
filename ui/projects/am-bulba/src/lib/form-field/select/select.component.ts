import {
  AfterContentInit,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  EmbeddedViewRef,
  EventEmitter,
  forwardRef,
  Inject,
  InjectionToken,
  Input,
  NgZone,
  OnInit,
  Optional,
  Output,
  QueryList,
  Self,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { createPopper, Instance } from '@popperjs/core';
import { DOCUMENT } from '@angular/common';
import { animate, style, transition, trigger } from '@angular/animations';
import { AmFormFieldControl } from '../form-field.type';
import { AM_OPTION_GROUP, OptionComponent } from '../option/option.component';
import { AmOptionGroup } from '../option/option.group';


const animationSlide = [
  trigger('slide', [
    transition(':enter', [
      style({
        transform: 'translateY(-20px) scaleY(0.8)',
        opacity: 0,
      }),
      animate('150ms cubic-bezier(0, 0, 0.2, 1)', style({
        transform: 'translateY(0) scaleY(1)',
        opacity: 1,
      })),
    ]),
    transition(':leave', [
      style({
        transform: 'translateY(0) scaleY(1)',
        opacity: 1,
      }),
      animate('150ms cubic-bezier(0, 0, 0.2, 1)', style({
        transform: 'translateY(-20px) scaleY(0.8)',
        opacity: 0,
      })),
    ]),
  ]),
];

export const AM_SELECT = new InjectionToken<SelectComponent>('AmSelect');

class SelectModel {
  private selections = new Set<OptionComponent>();

  get value() {
    return Array.from(this.selections);
  }

  add(option: OptionComponent) {
    this.selections.add(option);
  }

  remove(option: OptionComponent) {
    this.selections.delete(option);
  }

  clear() {
    this.selections.clear();
  }
}

@Component({
  selector: 'am-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [
    {
      provide: AM_SELECT,
      useExisting: SelectComponent,
    },
    {
      provide: AM_OPTION_GROUP,
      useExisting: SelectComponent,
    },
    {
      provide: AmFormFieldControl,
      useExisting: SelectComponent,
    },
  ],
  animations: [
    ...animationSlide,
  ],
})
export class SelectComponent implements OnInit, AfterContentInit, ControlValueAccessor, AmFormFieldControl, AmOptionGroup {

  @Output() closed = new EventEmitter();
  @Output() valueChange = new EventEmitter<any>();

  @Input() placeholder = '';
  @Input() multiply = false;

  control: NgControl;

  selectModel = new SelectModel();
  value: any = null;
  isTouched: boolean | null | undefined;

  isDropdownShow = false;

  accessorInitialValue: any | any[] | null = null;

  @ContentChildren(forwardRef(() => OptionComponent), {
    descendants: true,
  }) public options: QueryList<OptionComponent> | undefined;

  private view: EmbeddedViewRef<any> | null = null;
  private popperRef: Instance | null = null;
  private dropdownRef: HTMLElement | null = null;

  constructor(
    @Inject(DOCUMENT) private doc: Document,
    private vcr: ViewContainerRef,
    private zone: NgZone,
    private cdRef: ChangeDetectorRef,
    @Optional() @Self() control: NgControl,
  ) {
    this.control = control;
    if (this.control) {
      this.control.valueAccessor = this;
    }
  }

  ngOnInit(): void {
  }

  ngAfterContentInit(): void {
    this.cdRef.detectChanges();
    if (!this.options) {
      return;
    }

    if (this.accessorInitialValue) {
      this.resetOptions();
      this.checkOptionByValue(this.accessorInitialValue);
      return;
    }

    this.options.forEach(option => {
      if (option.checked) {
        this.selectModel.add(option);
      }
    });

    Promise.resolve().then(() => {
      this.updateValue();
      this._controlValueAccessorChangeFn(this.value);
      this.cdRef.markForCheck();
    });
  }

  open(dropdownTpl: TemplateRef<any>, trigger: HTMLElement): void {
    this.isDropdownShow = true;
    this.view = this.vcr.createEmbeddedView(dropdownTpl);
    this.dropdownRef = <HTMLElement>this.view.rootNodes[0];
    const dropdown = <HTMLElement>this.dropdownRef.querySelector('.am-select-dropdown');

    this.doc.body.appendChild(this.dropdownRef);

    dropdown.style.width = `${trigger.offsetWidth}px`;

    this.zone.runOutsideAngular(() => {
      this.popperRef = createPopper(trigger, dropdown, {
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [0, 5],
            },
          },
        ],
      });
    });
  }

  close(): void {
    this.isDropdownShow = false;
    this.closed.emit();
    this.popperRef?.destroy();
    this.view?.destroy();
    this.dropdownRef?.remove();
    this.view = null;
    this.popperRef = null;
    this.dropdownRef = null;

    this._onTouched();
  }

  checkOption(option: OptionComponent, isUserChange = true): void {
    if (this.options) {
      Promise.resolve().then(() => {
        if (!this.multiply) {
          this.resetOptions();
          this.close();
          this.selectModel.add(option);
          option.checked = true;
        } else {
          option.checked = !option.checked;
          option.checked
            ? this.selectModel.add(option)
            : this.selectModel.remove(option);
        }

        option.markForCheck();
        this.updateValue();
        this._controlValueAccessorChangeFn(this.value);

        if (isUserChange) {
          this.emitChange();
        }
      });
    }
  }

  checkOptionByValue(value: any | any[]): void {
    if (this.options) {
      const isArray = this.isArray(value);
      const values: any[] = isArray ? value : [value];

      values.forEach(v => {
        const option = this.options?.find(option => option.value === v);
        if (option) {
          this.checkOption(option);
        }
      });
    }
  }

  get valueAsString() {
    return this.options
      ?.filter(opt => opt.checked)
      .map(opt => opt.elementRef.nativeElement.innerText.trim())
      .join(', ')
  }

  private updateValue() {
    if (this.multiply) {
      this.value = [...this.selectModel.value].map(v => v.value);
    } else {
      this.value = this.selectModel.value[0]?.value;
    }
  }

  private resetOptions(): void {
    if (this.options) {
      this.options.forEach(option => {
        option.checked = false;
        option.markForCheck();
      });
      this.selectModel.clear();
      this.updateValue();
    }
  }

  onOptionCheck(option: OptionComponent): void {
    this.checkOption(option);
  }

  emitChange(): void {
    this.valueChange.emit(this.value || null);
  }

  isArray = (value: any) => Array.isArray(value);

  // Value accessor
  writeValue(value: any): void {
    if (!this.options) {
      this.accessorInitialValue = value;
      return;
    }

    if (!value) {
      this.resetOptions();
      this.emitChange();
      return;
    }

    this.checkOptionByValue(value);
    this.cdRef.markForCheck();
  }

  registerOnChange(fn: any): void {
    this._controlValueAccessorChangeFn = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }

  _controlValueAccessorChangeFn: (value: any) => void = () => {};

  _onTouched: () => any = () => {};
}
