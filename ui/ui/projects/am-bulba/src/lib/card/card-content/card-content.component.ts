import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef, Inject,
  OnInit, Optional,
  ViewChild,
} from '@angular/core';
import { Subject } from "rxjs";
import { AM_CARD, CardComponent } from "../card.component";

@Component({
  selector: 'div[amCardContent]',
  templateUrl: './card-content.component.html',
  styleUrls: ['./card-content.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardContentComponent implements OnInit, AfterViewInit {

  @ViewChild('content') ref!: ElementRef<HTMLElement>;

  height$ = new Subject<string>();

  get scrollHeight() {
    return this.ref?.nativeElement.scrollHeight + 'px';
  }

  constructor(
    @Optional() @Inject(AM_CARD) public card: CardComponent,
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.card.expand
      ? this.expand()
      : this.collapse()
  }

  expand() {
    this.height$.next(this.scrollHeight);
  }

  collapse() {
    this.height$.next('0');
  }
}
