import { Injectable } from '@angular/core';
import { Select } from '@ngxs/store';
import { DashboardState, DashboardStateModel } from '@app/store/dashboard/state/dashboard.state';
import { Observable } from 'rxjs';
import { DashboardActions } from '@app/store/dashboard/state/dashboard.actions';
import { StoreFacadeBase } from '@app/store/store-facade-base';

@Injectable()
export class DashboardFacade extends StoreFacadeBase {
  @Select(DashboardState.state) state$!: Observable<DashboardStateModel>;

  getAll() {
    return this.store.dispatch(new DashboardActions.GetAll())
  }
}
