import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ContentChildren,
  forwardRef,
  QueryList,
  Output,
  EventEmitter, ViewChild, TemplateRef
} from '@angular/core';
import { AM_OPTION_GROUP, OptionComponent } from '../option/option.component';
import { AmOptionGroup } from '../option/option.group';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'am-autocomplete-panel',
  exportAs: 'autocompletePanel',
  styleUrls: ['./autocomplete-panel.scss'],
  template: `
    <ng-template>
      <div class="autocomplete-overlay" (click)="close()">
        <div class="autocomplete-dropdown shadow-lg" (click)="$event.stopPropagation()">
          <ul
            class="menu py-3 bg-base-200 rounded-box"
            *ngIf="isDropdownShow"
            [@slide]
            (@slide.done)="!isDropdownShow && emitClose()"
          >
            <ng-content select="am-option"></ng-content>
          </ul>
        </div>
      </div>
    </ng-template>
  `,
  providers: [
    {
      provide: AM_OPTION_GROUP,
      useExisting: AutocompletePanel,
    },
  ],
  animations: [
    trigger('slide', [
      transition(':enter', [
        style({
          transform: 'translateY(30px)',
          opacity: 0,
        }),
        animate('120ms cubic-bezier(.4,0,.2,1)', style({
          transform: 'translateY(0)',
          opacity: 1,
        })),
      ]),
      transition(':leave', [
        style({
          transform: 'translateY(0)',
          opacity: 1,
        }),
        animate('120ms cubic-bezier(.4,0,.2,1)', style({
          transform: 'translateY(30px)',
          opacity: 0,
        })),
      ]),
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AutocompletePanel implements OnInit, AmOptionGroup {

  @ViewChild(TemplateRef) panelContent: TemplateRef<any> | undefined;

  @Output() onChange = new EventEmitter<OptionComponent>();
  @Output() onClose = new EventEmitter();

  get instance() {
    return this;
  }

  isDropdownShow = true;

  @ContentChildren(forwardRef(() => OptionComponent), {
    descendants: true,
  }) public options: QueryList<OptionComponent> = new QueryList<OptionComponent>();

  constructor() {
  }

  ngOnInit(): void {
  }

  onOptionCheck(option: OptionComponent): void {
    this.onChange.emit(option);
  }

  close() {
    this.isDropdownShow = false;
  }

  emitClose() {
    this.onClose.emit();
    this.isDropdownShow = true;
  }
}
