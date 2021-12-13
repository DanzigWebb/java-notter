import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { GroupState } from './state/group.state';
import { Observable } from 'rxjs';
import { GroupCreateDto, GroupDto } from '@app/models';
import { GroupActions } from './state/group.actions';

@Injectable()
export class GroupFacade {

  @Select(GroupState.groups) groups$!: Observable<GroupDto[]>;

  constructor(
    private store: Store,
  ) {}

  getAll() {
    return this.store.dispatch(new GroupActions.GetAll());
  }

  create(group: GroupCreateDto) {
    return this.store.dispatch(new GroupActions.Create(group));
  }

  delete(id: number) {
    return this.store.dispatch(new GroupActions.Remove(id));
  }

  update(group: GroupDto) {
    return this.store.dispatch(new GroupActions.Update(group));
  }
}
