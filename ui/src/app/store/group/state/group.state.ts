import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { GroupActions } from './group.actions';
import { GroupDto } from '@app/models';
import { GroupsService } from '@app/groups';
import { switchMap, tap } from 'rxjs/operators';

export interface GroupStateModel {
  groups: GroupDto[];
}

const defaults = {
  groups: [],
};

@State<GroupStateModel>({
  name: 'group',
  defaults,
})
@Injectable()
export class GroupState {

  @Selector()
  static state(state: GroupStateModel) {
    return state;
  }

  @Selector()
  static groups(state: GroupStateModel) {
    return state.groups;
  }

  constructor(
    private groups: GroupsService,
  ) {
  }

  @Action(GroupActions.GetAll)
  getAll({setState}: StateContext<GroupStateModel>) {
    return this.groups.getAll().pipe(
      tap((groups) => {
        setState({groups: [...groups]});
      }),
    );
  }

  @Action(GroupActions.Create)
  create({getState, setState}: StateContext<GroupStateModel>, {payload}: GroupActions.Create) {
    return this.groups.create(payload).pipe(
      tap((group) => {
        const state = getState();
        setState({groups: [...state.groups, group]});
      }),
    );
  }

  @Action(GroupActions.Update)
  update({dispatch}: StateContext<GroupStateModel>, {payload}: GroupActions.Update) {
    return this.groups.update(payload).pipe(
      switchMap(() => dispatch(GroupActions.GetAll)),
    );
  }

  @Action(GroupActions.Remove)
  delete({getState, setState, dispatch}: StateContext<GroupStateModel>, {payload}: GroupActions.Remove) {
    return this.groups.delete(payload).pipe(
      switchMap(() => dispatch(GroupActions.GetAll)),
    );
  }
}
