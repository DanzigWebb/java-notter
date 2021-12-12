import {
  AfterViewChecked,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  Inject,
  InjectionToken,
  Input,
  OnInit,
  Optional,
  QueryList,
} from '@angular/core';

export const AM_ACCORDION_GROUP = new InjectionToken<AccordionGroup>('AmAccordionGroup');

@Component({
  selector: 'am-accordion',
  template: `
      <div tabindex="0"
           class="collapse border rounded-box border-base-300 collapse-arrow"
           [class.collapse-open]="isActive"
           (click)="onClick()"
      >
          <ng-content></ng-content>
      </div>
  `,
  styleUrls: ['./accordion.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Accordion {
  @Input() isActive = false;

  constructor(
    @Optional() @Inject(AM_ACCORDION_GROUP) private group: AccordionGroup,
    private cdRef: ChangeDetectorRef,
  ) {}

  onClick() {
    if (this.group) {
      this.group.openItem(this);
      return;
    }
    this.isActive = !this.isActive;
  }

  markForCheck() {
    this.cdRef.markForCheck();
  }
}

@Component({
  selector: 'div[amAccordionHeader]',
  template: `
      <div class="collapse-title text-xl font-medium">
          <ng-content></ng-content>
      </div>
  `,
  styleUrls: ['./accordion.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'tabindex': '0',
    'class': 'collapse',
  },
})
export class AccordionHeader {
  @Input() active = false;
}

@Component({
  selector: 'div[amAccordionContent]',
  template: `
      <ng-content></ng-content>
  `,
  styleUrls: ['./accordion.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'collapse-content',
  },
})
export class AccordionContent {

  @Input() active = false;
}

@Component({
  selector: 'am-accordion-group',
  template: `
      <ng-container>
          <ng-content></ng-content>
      </ng-container>
  `,
  providers: [
    {
      provide: AM_ACCORDION_GROUP,
      useExisting: AccordionGroup,
    },
  ],
  styleUrls: ['./accordion.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccordionGroup implements OnInit, AfterViewChecked {

  @Input() multiple = false;

  @ContentChildren(Accordion) items: QueryList<Accordion> = new QueryList();

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewChecked() {
  }

  openItem(item: Accordion) {
    if (this.multiple) {
      item.isActive = true;
    } else {
      this.items.forEach(item => {
        item.isActive = false;
        item.markForCheck();
      });
      item.isActive = true;
      item.markForCheck();
    }
  }
}
