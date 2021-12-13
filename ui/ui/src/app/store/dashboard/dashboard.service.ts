import { Injectable } from '@angular/core';
import { Config } from '@app/config';
import { HttpClient } from '@angular/common/http';
import { DashboardDto } from '@app/models';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  get url() {
    return this.config.host;
  }

  constructor(
    private config: Config,
    private http: HttpClient,
  ) {
  }

  getAll() {
    const url = this.url + 'dashboard';
    return this.http.get<DashboardDto[]>(url);
  }
}
