import { Inject, Injectable } from '@angular/core';
import { fromEvent } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { auditTime, distinctUntilChanged, map, startWith } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ResponsiveService {

  resize$ = this.getWindowWidth();

  constructor(
    @Inject(DOCUMENT) private doc: Document
  ) { }

  private getWindowWidth() {
    return fromEvent(this.doc.defaultView!, 'resize').pipe(
      auditTime(300), // || debounceTime
      map((event: Event) => (event.target as Window).innerWidth),
      startWith(this.doc.defaultView!.innerWidth),
      distinctUntilChanged()
    )
  }
}
