import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, Input, OnInit } from '@angular/core';
import { TabLabelComponent } from "../tab-label/tab-label.component";
import { animate, style, transition, trigger } from "@angular/animations";

const animationSlide = [
    trigger('slideLeft', [
    transition(':enter', [
      style({
        opacity: 0,
        transform: 'translateX(-100%)',
      }),
      animate('350ms cubic-bezier(0, 0, 0.2, 1)', style({
        opacity: 1,
        transform: 'translateX(0)',
      })),
    ]),
  ]),
];

@Component({
  selector: 'am-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss'],
  animations: animationSlide,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabComponent implements OnInit {

  @Input() active = false;
  @Input() label = '';

  @ContentChild(TabLabelComponent) labelComponent: TabLabelComponent | undefined;

  constructor(
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
  }

  detectChanges() {
    this.cdRef.detectChanges();
  }
}
