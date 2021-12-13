import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { DashboardActions } from './dashboard.actions';
import { DashboardDto } from '@app/models';
import { DashboardService } from '@app/store/dashboard/dashboard.service';
import { tap } from 'rxjs/operators';

export interface DashboardStateModel {
  items: DashboardDto[]
}

const defaults = {
  items: []
};

@State<DashboardStateModel>({
  name: 'dashboard',
  defaults
})
@Injectable()
export class DashboardState {

  @Selector()
  static state(state: DashboardStateModel) {
    return state;
  }

  @Action(DashboardActions.GetAll)
  add({ setState }: StateContext<DashboardStateModel>) {
    return this.dashService.getAll().pipe(
      tap((items) => {
        setState({ items: [ ...items ] });
      })
    )
  }

  constructor(
    private dashService: DashboardService
  ) {
  }
}
