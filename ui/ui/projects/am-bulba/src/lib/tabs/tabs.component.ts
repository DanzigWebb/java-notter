import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output,
  QueryList,
} from '@angular/core';
import { TabComponent } from "./tab/tab.component";
import { TabsPositionType, TabsSizeType, TabsViewType } from "./tabs.type";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

export const TABS_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TabsComponent),
  multi: true,
};

@Component({
  selector: 'am-tabs-group',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  providers: [TABS_VALUE_ACCESSOR],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsComponent implements ControlValueAccessor, OnInit, AfterContentInit {

  @Input() position: TabsPositionType | undefined;
  @Input() size: TabsSizeType | undefined;
  @Input() viewType: TabsViewType | undefined;
  @Input() rounded = false;

  @Output() valueChange = new EventEmitter<number>();

  @ContentChildren(TabComponent) tabs: QueryList<TabComponent> | undefined;

  private initialDisable = false;
  private initialValue: number | null = null;

  constructor(
    private cdRef: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
  }

  ngAfterContentInit() {
    if (this.tabs) {
      if (this.initialValue && Number(this.initialValue) >= 0) {
        this.selectTabByIndex(Number(this.initialValue));
      } else {
        this.setActiveTab(this.tabs);
      }

      if (this.initialDisable) {
        this.toggleDisableTabs(this.tabs, true);
      }
    }
  }

  setActiveTab(tabs: QueryList<TabComponent>) {
    const activeTabs = tabs.filter((tab) => tab.active) || [];

    if (activeTabs.length === 0) {
      this.selectTab(tabs.first);
    }
  }

  selectTab(selectedTab: TabComponent) {
    if (this.tabs) {
      let indexOfTab = -1;

      this.tabs.toArray().forEach((tab, index) => {
        if (tab === selectedTab) {
          indexOfTab = index;
        }
        tab.active = false;
        tab.detectChanges();
      });

      this.valueChange.emit(indexOfTab);
      this._controlValueAccessorChangeFn(indexOfTab);
      this._onTouched();

      selectedTab.active = true;
      selectedTab.detectChanges();
      this.cdRef.detectChanges();
    }
  }

  selectTabByIndex(index: number) {
    const tab: TabComponent | undefined = this.tabs?.get(index);
    if (tab) {
      this.selectTab(tab);
    }
  }

  toggleDisableTabs(tabs: QueryList<TabComponent>, state: boolean) {
    tabs.forEach((tab) => {
      const label = tab.labelComponent;
      if (label) {
        label.disabled = state;
        label.detectChanges();
      }
    });

    this.cdRef.markForCheck();
  }

  // Value accessor
  writeValue(value: any): void {
    if (this.tabs) {
      this.selectTabByIndex(value);
    } else {
      this.initialValue = value;
    }
  }

  registerOnChange(fn: any): void {
    this._controlValueAccessorChangeFn = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    if (this.tabs) {
      this.toggleDisableTabs(this.tabs, isDisabled);
    } else {
      this.initialDisable = isDisabled;
    }
  }

  _controlValueAccessorChangeFn: (value: any) => void = () => {};

  _onTouched: () => any = () => {};
}
