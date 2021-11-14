import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { NoteDto } from '@app/models';
import { NoteActions } from '@app/store/note/state/note.actions';
import { NotesService } from '@app/notes';
import { tap } from 'rxjs/operators';
import { GroupFacade } from '@app/store/group';

export interface NoteStateModel {
  notes: NoteDto[];
}

const defaults = {
  notes: []
};

@State<NoteStateModel>({
  name: 'note',
  defaults
})
@Injectable()
export class NoteState {

  constructor(
    private notes: NotesService,
    private groupFacade: GroupFacade,
  ) {
  }

  @Action(NoteActions.Create)
  create({getState, setState}: StateContext<NoteStateModel>, {payload}: NoteActions.Create) {
    this.notes.create(payload).pipe(
      tap(() => {
        this.groupFacade.getAll();
      })
    );
  }

  @Action(NoteActions.Update)
  update({getState, setState}: StateContext<NoteStateModel>, {payload}: NoteActions.Update) {
    this.notes.update(payload).pipe(
      tap(() => {
        this.groupFacade.getAll();
      })
    );
  }

  @Action(NoteActions.Remove)
  remove({getState, setState}: StateContext<NoteStateModel>, {payload}: NoteActions.Remove) {
    this.notes.remove(payload).pipe(
      tap(() => {
        this.groupFacade.getAll();
      })
    );
  }
}
