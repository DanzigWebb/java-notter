import { Component, EventEmitter, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { animate, style, transition, trigger } from "@angular/animations";

@Component({
  selector: 'am-menu-panel',
  exportAs: 'amMenu',
  templateUrl: './menu-panel.component.html',
  styleUrls: ['./menu-panel.component.scss'],
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
  ]
})
export class MenuPanelComponent implements OnInit {

  @ViewChild(TemplateRef) panelContent: TemplateRef<any> | undefined;

  @Output() onClose = new EventEmitter();

  isShow = true;

  get instance() {
    return this;
  }

  constructor() { }

  ngOnInit(): void {
  }

  close() {
    this.isShow = false;
  }

  emitClose() {
    this.onClose.emit();
    this.isShow = true;
  }
}
