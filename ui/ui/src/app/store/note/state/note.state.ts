import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { NoteDto } from '@app/models';
import { NoteActions } from '@app/store/note/state/note.actions';
import { NotesService } from '@app/notes';
import { switchMap } from 'rxjs/operators';
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
    return this.notes.create(payload).pipe(
      switchMap(() => this.groupFacade.getAll())
    );
  }

  @Action(NoteActions.Update)
  update({getState, setState}: StateContext<NoteStateModel>, {payload}: NoteActions.Update) {
    return this.notes.update(payload).pipe(
      switchMap(() => this.groupFacade.getAll())
    );
  }

  @Action(NoteActions.Remove)
  remove({getState, setState}: StateContext<NoteStateModel>, {payload}: NoteActions.Remove) {
    return this.notes.delete(payload).pipe(
      switchMap(() => this.groupFacade.getAll())
    );
  }

  @Action(NoteActions.AddTodo)
  addTodo({getState, setState}: StateContext<NoteStateModel>, {payload, noteId}: NoteActions.AddTodo) {
    return this.notes.addTodo(payload, noteId).pipe(
      switchMap(() => this.groupFacade.getAll())
    );
  }

  @Action(NoteActions.UpdateTodo)
  updateTodo({getState, setState}: StateContext<NoteStateModel>, {payload, noteId}: NoteActions.UpdateTodo) {
    return this.notes.updateTodo(payload, noteId).pipe(
      switchMap(() => this.groupFacade.getAll())
    );
  }

  @Action(NoteActions.DeleteTodo)
  deleteTodo({getState, setState}: StateContext<NoteStateModel>, {todoId, noteId}: NoteActions.DeleteTodo) {
    return this.notes.deleteTodo(todoId, noteId).pipe(
      switchMap(() => this.groupFacade.getAll())
    );
  }

  @Action(NoteActions.UpdateTodoOrder)
  updateTodoOrder({getState, setState}: StateContext<NoteStateModel>, {payload}: NoteActions.UpdateTodoOrder) {
    return this.notes.updateTodoOrder(payload).pipe(
      switchMap(() => this.groupFacade.getAll())
    );
  }

  @Action(NoteActions.UpdateNoteOrder)
  updateNoteOrder({getState, setState}: StateContext<NoteStateModel>, {payload}: NoteActions.UpdateNoteOrder) {
    return this.notes.updateNoteOrder(payload).pipe(
      switchMap(() => this.groupFacade.getAll())
    );
  }

  @Action(NoteActions.Relate)
  relate({getState, setState}: StateContext<NoteStateModel>, {noteId, relateId}: NoteActions.Relate) {
    return this.notes.relate(noteId, relateId).pipe(
      switchMap(() => this.groupFacade.getAll())
    );
  }

  @Action(NoteActions.UnRelate)
  unRelate({getState, setState}: StateContext<NoteStateModel>, {noteId, relateId}: NoteActions.UnRelate) {
    return this.notes.unRelate(noteId, relateId).pipe(
      switchMap(() => this.groupFacade.getAll())
    );
  }
}
