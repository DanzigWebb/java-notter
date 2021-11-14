import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { TagDto } from '@app/models';
import { TagActions } from '@app/store/tag/state/tag.actions';
import { TagsService } from '@app/shared/components/tags/tags.service';
import { switchMap, tap } from 'rxjs/operators';

export interface TagStateModel {
  items: TagDto[];
}

const defaults = {
  items: [],
};

@State<TagStateModel>({
  name: 'tag',
  defaults,
})
@Injectable()
export class TagState {

  @Selector()
  static state(state: TagStateModel) {
    return state;
  }

  @Selector()
  static tags(state: TagStateModel) {
    return state.items;
  }

  constructor(
    private tags: TagsService,
  ) {}

  @Action(TagActions.Create)
  add({dispatch}: StateContext<TagStateModel>, {payload}: TagActions.Create) {
    this.tags.create(payload).pipe(
      switchMap(() => dispatch(TagActions.GetAll)),
    );
  }

  @Action(TagActions.Delete)
  delete({dispatch}: StateContext<TagStateModel>, {payload}: TagActions.Delete) {
    this.tags.delete(payload).pipe(
      switchMap(() => dispatch(TagActions.GetAll)),
    );
  }

  @Action(TagActions.Update)
  update({dispatch}: StateContext<TagStateModel>, {payload}: TagActions.Update) {
    const {id, name} = payload;
    this.tags.update(id, {name}).pipe(
      switchMap(() => dispatch(TagActions.GetAll)),
    );
  }

  @Action(TagActions.GetAll)
  getAll({setState}: StateContext<TagStateModel>) {
    return this.tags.getAll().pipe(
      tap((tags) => {
        setState({items: [...tags]});
      }),
    );
  }
}
