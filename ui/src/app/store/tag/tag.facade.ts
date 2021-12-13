import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { TagActions } from '@app/store/tag/state/tag.actions';
import { TagCreateDto, TagDto } from '@app/models';
import { TagState, TagStateModel } from '@app/store/tag/state/tag.state';
import { Observable } from 'rxjs';

@Injectable()
export class TagFacade {

  @Select(TagState.state) state$!: Observable<TagStateModel>;
  @Select(TagState.tags) tags$!: Observable<TagDto[]>;

  constructor(
    private store: Store,
  ) {}

  getAll() {
    return this.store.dispatch(new TagActions.GetAll());
  }

  getColors() {
    return this.store.dispatch(new TagActions.GetColors());
  }

  create(dto: TagCreateDto) {
    return this.store.dispatch(new TagActions.Create(dto));
  }

  update(dto: TagDto) {
    return this.store.dispatch(new TagActions.Update(dto));
  }

  delete(id: number) {
    return this.store.dispatch(new TagActions.Delete(id));
  }
}
