import { LoginDto, SignupDto } from "@app/models";

export namespace UserActions {
  export class Login {
    static readonly type = '[User] Login';
    constructor(public payload: LoginDto) {}
  }

  export class Signup {
    static readonly type = '[User] Registration';
    constructor(public payload: SignupDto) {}
  }

  export class Logout {
    static readonly type = '[User] Logout';
  }
}
