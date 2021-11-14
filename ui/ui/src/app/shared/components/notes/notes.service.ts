import { Injectable } from '@angular/core';
import { Config } from '@app/config';
import { HttpClient } from '@angular/common/http';
import { NoteCreateDto, NoteDto } from '@app/models';

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
  ) { }


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

  remove(id: number) {
    const url = this.url + id;
    return this.http.delete(url);
  }

  update(group: NoteDto) {
    const url = this.url + group.id;
    return this.http.put<NoteDto>(url, group);
  }

}
