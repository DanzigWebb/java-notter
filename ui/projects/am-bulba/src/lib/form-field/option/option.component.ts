import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef, EventEmitter,
  Inject,
  InjectionToken,
  Input,
  OnInit,
  Optional, Output,
} from '@angular/core';
import { AmOptionGroup } from './option.group';

export const AM_OPTION_GROUP = new InjectionToken<AmOptionGroup>('AmOptionGroup');

@Component({
  selector: 'am-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OptionComponent<T = any> implements OnInit {

  @Input() checked = false;
  @Input() value: any = '';
  @Input() disabled = false;

  @Output() onCheck = new EventEmitter<OptionComponent>();

  getValue(): T {
    return this.value as T;
  }

  constructor(
    @Optional() @Inject(AM_OPTION_GROUP) public group: AmOptionGroup,
    private cdRef: ChangeDetectorRef,
    public elementRef: ElementRef,
  ) {
  }

  ngOnInit(): void {
  }

  onClick($event: MouseEvent) {
    $event.preventDefault();
    this.onCheck.emit(this);
    if (this.group) {
      this.group.onOptionCheck(this);
    }
  }

  markForCheck() {
    this.cdRef.markForCheck();
  }
}
