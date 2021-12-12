import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component, Input,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'am-tab-label',
  templateUrl: './tab-label.component.html',
  styleUrls: ['./tab-label.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabLabelComponent implements OnInit, AfterContentInit {

  @Input() disabled = false;

  @ViewChild(TemplateRef) labelContent: TemplateRef<any> | undefined;

  constructor(
    private cdRef: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
  }

  ngAfterContentInit() {
    this.detectChanges();
  }

  detectChanges() {
    this.cdRef.detectChanges();
  }
}
