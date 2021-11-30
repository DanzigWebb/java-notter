import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { NoteMenuActions } from '@app/store/ui/note-menu/state/note-menu.actions';

export interface NoteMenuStateModel {
  isOpen: boolean;
}

const defaults = {
  isOpen: true
};

@State<NoteMenuStateModel>({
  name: 'noteMenu',
  defaults
})
@Injectable()
export class NoteMenuState {
  @Selector()
  static state(state: NoteMenuStateModel) {
    return state;
  }

  @Action(NoteMenuActions.Open)
  open({getState, setState}: StateContext<NoteMenuStateModel>) {
    const state = getState();
    setState({...state, isOpen: true});
  }

  @Action(NoteMenuActions.Close)
  close({getState, setState}: StateContext<NoteMenuStateModel>) {
    const state = getState();
    setState({...state, isOpen: false});
  }
}
