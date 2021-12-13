import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { UserActions } from './user.actions';
import { AuthService } from '@app/auth';
import { tap } from 'rxjs/operators';
import { LoginDtoResponse } from '@app/models';

export interface UserStateModel {
  name?: string;
  email?: string;
  token?: string;
  isLogin: boolean;
}

const defaults: UserStateModel = {
  isLogin: false,
};


try {
  const localDto: LoginDtoResponse | string = JSON.parse(
    localStorage.getItem('user') || ''
  );

  if (typeof localDto === 'object') {
    defaults.isLogin = true;
    defaults.token = localDto.token;
    defaults.name = localDto.user.name;
    defaults.email = localDto.user.email;
  }
} catch {
  
}


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
      tap((dto) => {
        setState({
          isLogin: true,
          token: dto.token,
          name: dto.user.name,
          email: dto.user.name,
        });
        localStorage.setItem('token', dto.token);
        localStorage.setItem('user', JSON.stringify(dto));
      }),
    );
  }

  @Action(UserActions.Signup)
  signup({getState, setState}: StateContext<UserStateModel>, {payload}: UserActions.Signup) {
    return this.auth.signup(payload);
  }
}
