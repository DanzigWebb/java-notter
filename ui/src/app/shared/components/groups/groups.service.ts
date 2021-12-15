import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from '@app/config';
import { GroupCreateDto, GroupDto } from '@app/models';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  get url() {
    return this.config.host + 'group/';
  }

  constructor(
    private http: HttpClient,
    private config: Config,
  ) {
  }

  create(dto: GroupCreateDto) {
    const url = this.url;
    return this.http.post<GroupDto>(url, dto);
  }

  getAll() {
    const url = this.url;
    return this.http.get<GroupDto[]>(url);
  }

  getOne(id: number) {
    const url = this.url + id;
    return this.http.get<GroupDto>(url);
  }

  delete(id: number) {
    const url = this.url + id;
    return this.http.delete(url);
  }

  update(group: GroupDto) {
    const url = this.url + group.id;
    return this.http.put<GroupDto>(url, group);
  }
}
