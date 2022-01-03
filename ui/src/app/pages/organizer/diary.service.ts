import { Injectable } from '@angular/core';
import { DiaryCreateDto, DiaryDto } from '@app/models';
import { Config } from '@app/config';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DiaryService {

  private _lastMonth$ = new BehaviorSubject<Map<number, DiaryDto[]>>(new Map<number, DiaryDto[]>());
  lastMonth$ = this._lastMonth$.asObservable();

  get url() {
    return this.config.host + 'diary';
  }

  constructor(
    private config: Config,
    private http: HttpClient,
  ) {
  }

  save(dto: DiaryCreateDto) {
    const url = `${this.url}`;
    return this.http.post(url, dto);
  }

  get(from: number, to: number) {
    const url = `${this.url}?from=${from}&to=${to}`;
    return this.http.get<DiaryDto[]>(url).pipe(
      tap((data) => {
        const map: Map<number, DiaryDto[]> = new Map();
        data.forEach((dto) => {
          const key = new Date(dto.day).getTime();
          let items = map.get(key);
          if (items) {
            items.push(dto);
          } else {
            map.set(key, [dto]);
          }
        });

        this._lastMonth$.next(map);
      })
    );
  }
}
