import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from '@app/config';
import { TagCreateDto, TagDto } from '@app/models';

@Injectable({
  providedIn: 'root'
})
export class TagsService {

  get url() {
    return this.config.host + 'tag/';
  }

  constructor(
    private http: HttpClient,
    private config: Config,
  ) {
  }

  create(dto: TagCreateDto) {
    const url = this.url;
    return this.http.post<TagDto>(url, dto);
  }

  getAll() {
    const url = this.url + 'all';
    return this.http.get<TagDto[]>(url);
  }

  delete(id: number) {
    const url = this.url + id;
    return this.http.delete(url);
  }

  update(id: number, dto: TagCreateDto) {
    const url = this.url + id;
    return this.http.put(url, dto);
  }
}
