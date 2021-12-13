import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit, Optional } from '@angular/core';
import { AM_CARD, CardComponent } from "../card.component";

@Component({
  selector: 'header[amCardHeader]',
  templateUrl: './card-header.component.html',
  styleUrls: ['./card-header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'card-header',
  },
})
export class CardHeaderComponent implements OnInit {

  get expand() {
    return this.card.expand;
  }

  constructor(
    @Optional() @Inject(AM_CARD) public card: CardComponent,
    private cdRef: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
  }

  toggle() {
    this.card.expand = !this.card.expand;
  }

  markForCheck() {
    this.cdRef.markForCheck();
  }
}
