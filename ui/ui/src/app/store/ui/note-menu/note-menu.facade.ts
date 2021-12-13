import { Injectable } from '@angular/core';
import { StoreFacadeBase } from '@app/store/store-facade-base';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { NoteMenuActions } from '@app/store/ui/note-menu/state/note-menu.actions';
import { NoteMenuState, NoteMenuStateModel } from '@app/store/ui/note-menu/state/note-menu.state';

@Injectable()
export class NoteMenuFacade extends StoreFacadeBase {
  @Select(NoteMenuState.state) state$!: Observable<NoteMenuStateModel>;

  open() {
    this.store.dispatch(new NoteMenuActions.Open())
  }

  close() {
    this.store.dispatch(new NoteMenuActions.Close())
  }
}
