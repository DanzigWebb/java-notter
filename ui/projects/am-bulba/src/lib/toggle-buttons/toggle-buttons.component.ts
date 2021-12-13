import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, Input, OnInit, Optional } from '@angular/core';
import { AM_BUTTON_TOGGLE_GROUP, ToggleButtonsGroupDirective } from "./toggle-buttons-group.directive";

@Component({
  selector: 'button[amToggleButton]',
  templateUrl: './toggle-buttons.component.html',
  styleUrls: ['./toggle-buttons.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'btn',
    '(click)': 'onClick()',
    '[class.btn-active]': 'checked',
    '[class.btn-xs]': 'size === "xs"',
    '[class.btn-sm]': 'size === "sm"',
    '[class.btn-lg]': 'size === "lg"',
    '[disabled]': 'disabled'
  },
})
export class ToggleButtonsComponent implements OnInit {
  private _checked = false;

  @Input() value: any;
  @Input() disabled = false;
  @Input() size: 'xs' | 'sm' | 'lg' | undefined;

  @Input()
  get checked() { return this._checked; };

  set checked(value) {
    this._checked = value;
  }

  buttonToggleGroup: ToggleButtonsGroupDirective;

  constructor(
    @Optional() @Inject(AM_BUTTON_TOGGLE_GROUP) toggleGroup: ToggleButtonsGroupDirective,
    private ref: ChangeDetectorRef,
  ) {
    this.buttonToggleGroup = toggleGroup;
  }

  ngOnInit(): void {
  }

  onClick() {
    this.buttonToggleGroup.syncButtonsState(this);
  }

  detectChange() {
    this.ref.markForCheck();
  }
}
