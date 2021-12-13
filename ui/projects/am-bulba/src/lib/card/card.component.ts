import { AfterContentInit, Component, ContentChild, InjectionToken, Input, OnInit } from '@angular/core';
import { CardContentComponent } from "./card-content/card-content.component";
import { CardHeaderComponent } from "./card-header/card-header.component";

export const AM_CARD = new InjectionToken<CardComponent>('AmCard');

@Component({
  selector: 'am-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
  providers: [
    {
      provide: AM_CARD,
      useExisting: CardComponent,
    },
  ],
})
export class CardComponent implements OnInit, AfterContentInit {
  private _expand = true;
  private _canExpand = true;

  @ContentChild(CardContentComponent) cardContent!: CardContentComponent;
  @ContentChild(CardHeaderComponent) cardHeader!: CardHeaderComponent;

  @Input() get expand() { return this._expand; };

  set expand(v) {
    this._expand = v;
    this.updateExpandState();
  }

  @Input() get canExpand() { return this._canExpand; };

  set canExpand(v) {
    this._canExpand = v;
    this.cardHeader?.markForCheck();
  }

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterContentInit(): void {
    this.updateExpandState();
  }

  updateExpandState(): void {
    this.expand
      ? this.expandContent()
      : this.collapseContent();

    this.cardHeader?.markForCheck();
  }

  expandContent(): void {
    this.cardContent?.expand();
  }

  collapseContent(): void {
    this.cardContent?.collapse();
  }
}
