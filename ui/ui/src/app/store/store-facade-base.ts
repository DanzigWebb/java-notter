import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';

@Injectable()
export class StoreFacadeBase {
  constructor(
    public store: Store,
  ) {
  }
}
