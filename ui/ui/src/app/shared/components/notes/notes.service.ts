import { Injectable } from '@angular/core';
import { Config } from '@app/config';
import { HttpClient } from '@angular/common/http';
import { NoteCreateDto, NoteDto, TodoCreateDto, TodoDto, UpdateOrderDto } from '@app/models';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  get url() {
    return this.config.host + 'note/';
  }

  constructor(
    private http: HttpClient,
    private config: Config
  ) {
  }


  create(dto: NoteCreateDto) {
    const url = this.url;
    return this.http.post<NoteDto>(url, dto);
  }

  getAll() {
    const url = this.url;
    return this.http.get<NoteDto[]>(url);
  }

  getOne(id: number) {
    const url = this.url + id;
    return this.http.get<NoteDto>(url);
  }

  delete(id: number) {
    const url = this.url + id;
    return this.http.delete(url);
  }

  update(group: NoteDto) {
    const url = this.url + group.id;
    return this.http.put<NoteDto>(url, group);
  }

  addTodo(todo: TodoCreateDto, noteId: number) {
    const url = `${this.url}${noteId}/todo/`;
    return this.http.post(url, todo);
  }

  updateTodo(todo: TodoDto, noteId: number) {
    const url = `${this.url}${noteId}/todo/${todo.id}`;
    return this.http.put(url, todo);
  }

  deleteTodo(todoId: number, noteId: number) {
    const url = `${this.url}${noteId}/todo/${todoId}`;
    return this.http.delete(url);
  }

  updateTodoOrder(dto: UpdateOrderDto[]) {
    const url = `${this.url}todo/order`;
    return this.http.post(url, dto);
  }

  updateNoteOrder(dto: UpdateOrderDto[]) {
    const url = `${this.url}order`;
    return this.http.post(url, dto);
  }

  relate(noteId: number, relateId: number) {
    const url = `${this.url}${noteId}/relate/${relateId}`;
    return this.http.post(url, null);
  }

  unRelate(noteId: number, relateId: number) {
    const url = `${this.url}${noteId}/un-relate/${relateId}`;
    return this.http.post(url, null);
  }
}
