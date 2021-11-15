import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { GroupFacade } from '@app/store/group';
import { TagFacade } from '@app/store/tag';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(
    private groups: GroupFacade,
    private tags: TagFacade,
  ) {
  }

  init() {
    const takeOne = <T>(obs: Observable<T>) => obs.pipe(take(1));
    return forkJoin([
      takeOne(this.groups.getAll()),
      takeOne(this.tags.getAll())]
    );
  }
}
