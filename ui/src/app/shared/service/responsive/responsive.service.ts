import { Inject, Injectable } from '@angular/core';
import { fromEvent, merge } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { auditTime, distinctUntilChanged, map, startWith } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ResponsiveService {

  resize$ = this.getWindowWidth();

  constructor(
    @Inject(DOCUMENT) private doc: Document
  ) {
  }

  private getWindowWidth() {
    return merge(this.getResizeEvent()).pipe(
      auditTime(300), // || debounceTime
      map(() => this.doc.defaultView!.innerWidth),
      startWith(this.doc.defaultView!.innerWidth),
      distinctUntilChanged()
    );
  }

  private getResizeEvent() {
    return fromEvent(this.doc.defaultView!, 'resize');
  };
}
