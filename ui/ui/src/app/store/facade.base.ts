import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';

@Injectable()
export class FacadeBase {
  constructor(
    public store: Store,
  ) {
  }
}
