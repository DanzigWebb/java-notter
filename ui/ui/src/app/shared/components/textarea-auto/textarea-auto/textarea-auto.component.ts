import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ElementRef,
  ViewChild,
  AfterViewInit,
  ContentChild, OnDestroy
} from '@angular/core';
import { TextareaAutoDirective } from '@app/shared/components/textarea-auto/textarea-auto.directive';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'textarea-auto',
  templateUrl: './textarea-auto.component.html',
  styleUrls: ['./textarea-auto.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'textarea textarea-ghost w-full resize-none leading-5 min-h-0 overflow-y-hidden px-1 py-1',
    'rows': '1',
  }
})
export class TextareaAutoComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('textClone') cloneRef!: ElementRef;
  @ContentChild(TextareaAutoDirective) textareaAutoDirective!: TextareaAutoDirective;

  get textarea(): HTMLTextAreaElement {
    return this.textareaAutoDirective.ref;
  }

  get clone(): HTMLDivElement {
    return this.cloneRef.nativeElement;
  }

  private destroy$ = new Subject();

  constructor() {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.setInitialValue();
    this.updateHeight();
    this.onInputChange();
  }

  onInputChange() {
    this.textareaAutoDirective.onInput.pipe(
      takeUntil(this.destroy$)
    ).subscribe(value => {
      this.clone.innerHTML = value + 'l';
      this.updateHeight();
    })
  }

  updateHeight() {
    const height = this.cloneRef.nativeElement.offsetHeight;
    this.textarea.style.height = height + 'px';
  }

  setInitialValue() {
    const value = this.textarea.value;
    this.clone.innerHTML = value + 'l';
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
