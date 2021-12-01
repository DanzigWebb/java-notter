import { Injectable } from '@angular/core';
import { NoteCreateDto, NoteDto, TodoCreateDto, TodoDto, UpdateOrderDto } from '@app/models';
import { Store } from '@ngxs/store';
import { NoteActions } from '@app/store/note/state/note.actions';

@Injectable()
export class NoteFacade {

  constructor(
    private store: Store,
  ) {
  }

  create(dto: NoteCreateDto) {
    return this.store.dispatch(new NoteActions.Create(dto));
  }

  update(dto: NoteDto) {
    return this.store.dispatch(new NoteActions.Update(dto));
  }

  delete(id: number) {
    return this.store.dispatch(new NoteActions.Remove(id));
  }

  addTodo(dto: TodoCreateDto, noteId: number) {
    return this.store.dispatch(new NoteActions.AddTodo(dto, noteId));
  }

  updateTodo(dto: TodoDto, noteId: number) {
    return this.store.dispatch(new NoteActions.UpdateTodo(dto, noteId));
  }

  deleteTodo(todoId: number, noteId: number) {
    return this.store.dispatch(new NoteActions.DeleteTodo(todoId, noteId));
  }

  updateTodoOrder(dto: UpdateOrderDto[]) {
    return this.store.dispatch(new NoteActions.UpdateTodoOrder(dto));
  }

  updateNoteOrder(dto: UpdateOrderDto[]) {
    return this.store.dispatch(new NoteActions.UpdateNoteOrder(dto));
  }

  relate(noteId: number, relateId: number) {
    return this.store.dispatch(new NoteActions.Relate(noteId, relateId));
  }

  unRelate(noteId: number, relateId: number) {
    return this.store.dispatch(new NoteActions.UnRelate(noteId, relateId));
  }
}
