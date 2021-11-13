import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { UserState, UserStateModel } from './state/user.state';
import { Observable } from 'rxjs';
import { LoginDto, SignupDto } from '@app/models';
import { UserActions } from './state/user.actions';
import { switchMap } from 'rxjs/operators';


@Injectable()
export class UserFacade {
  @Select(UserState.state) state$!: Observable<UserStateModel>;

  constructor(
    private store: Store,
  ) {}

  login(payload: LoginDto): Observable<UserStateModel> {
    return this.store.dispatch(new UserActions.Login(payload)).pipe(
      switchMap(() => this.state$),
    );
  }

  signup(payload: SignupDto): Observable<UserStateModel> {
    return this.store.dispatch(new UserActions.Signup(payload)).pipe(
      switchMap(() => this.state$),
    );
  }
}
