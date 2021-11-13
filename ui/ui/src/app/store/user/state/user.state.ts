import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { UserActions } from "./user.actions";
import { AuthService } from "@app/auth";
import { tap } from "rxjs/operators";

export interface UserStateModel {
  name?: string;
  email?: string;
  token?: string;
  isLogin: boolean;
}

const defaults: UserStateModel = {
  isLogin: false,
};

@State<UserStateModel>({
  name: 'user',
  defaults,
})
@Injectable()
export class UserState {

  @Selector()
  static state(state: UserStateModel): UserStateModel {
    return state;
  }

  constructor(
    private auth: AuthService,
  ) {
  }

  @Action(UserActions.Login)
  login({getState, setState}: StateContext<UserStateModel>, {payload}: UserActions.Login) {
    return this.auth.login(payload).pipe(
      tap((user) => {
        setState({
          isLogin: true,
          token: user.token,
        });
        localStorage.setItem('token', user.token);
      }),
    );
  }

  @Action(UserActions.Signup)
  signup({getState, setState}: StateContext<UserStateModel>, {payload}: UserActions.Signup) {
    return this.auth.signup(payload);
  }
}
