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

  addTodo(dto: TodoCreateDto, note: NoteDto) {
    return this.store.dispatch(new NoteActions.AddTodo(dto, note));
  }

  updateTodo(dto: TodoDto, note: NoteDto) {
    return this.store.dispatch(new NoteActions.UpdateTodo(dto, note));
  }

  deleteTodo(todoId: number, note: NoteDto) {
    return this.store.dispatch(new NoteActions.DeleteTodo(todoId, note));
  }

  updateTodoOrder(dto: UpdateOrderDto[], note: NoteDto) {
    return this.store.dispatch(new NoteActions.UpdateTodoOrder(dto, note));
  }

  updateNoteOrder(dto: UpdateOrderDto[]) {
    return this.store.dispatch(new NoteActions.UpdateNoteOrder(dto));
  }
}
