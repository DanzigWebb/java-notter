import {
  Component,
  ChangeDetectionStrategy,
  ElementRef,
  ViewChild,
  AfterViewInit,
  ContentChild,
  OnDestroy,
  AfterViewChecked,
} from '@angular/core';
import { TextareaAutoDirective } from '@app/shared/components/textarea-auto/textarea-auto.directive';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'textarea-auto',
  templateUrl: './textarea-auto.component.html',
  styleUrls: ['./textarea-auto.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextareaAutoComponent implements AfterViewInit, AfterViewChecked, OnDestroy {

  @ViewChild('textClone') cloneRef!: ElementRef;
  @ContentChild(TextareaAutoDirective) textareaAutoDirective!: TextareaAutoDirective;

  get textarea(): HTMLTextAreaElement {
    return this.textareaAutoDirective.ref;
  }

  get clone(): HTMLDivElement {
    return this.cloneRef?.nativeElement;
  }

  private destroy$ = new Subject();

  constructor() {
  }

  ngAfterViewChecked() {
    this.updateHeight();
  }

  ngAfterViewInit() {
    this.setInitialValue();
    this.updateHeight();
    this.onInputChange();
  }

  private onInputChange() {
    this.textareaAutoDirective.onInput.pipe(
      takeUntil(this.destroy$)
    ).subscribe(value => {
      this.clone.innerHTML = value + 'l';
      this.updateHeight();
    });
  }

  private updateHeight() {
    if (this.clone && this.textarea) {
      const height = this.clone.offsetHeight;
      this.textarea.style.height = height + 'px';
    }
  }

  private setInitialValue() {
    const value = this.textarea.value;
    this.clone.innerHTML = value + 'l';
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
