import { Action } from "@ngrx/store";

export enum AuthActionTypes {
  LOAD_TOKEN = "[Auth] Load Token",
  RELOAD_TOKEN = "[Auth] Reload Token",
  LOGIN = "[Auth] Login",
  LOGIN_SUCCESS = "[Auth] Login Success",
  LOGIN_FAILURE = "[Auth] Login Failure",
  SIGNUP = "[Auth] Signup",
  SIGNUP_SUCCESS = "[Auth] Signup Success",
  SIGNUP_FAILURE = "[Auth] Signup Failure",
  LOGOUT = "[Auth] Logout"
}

export class LoadToken implements Action {
  readonly type = AuthActionTypes.LOAD_TOKEN;
  constructor(public payload: { accessToken: string; userData: object }) {}
}

export class ReloadToken implements Action {
  readonly type = AuthActionTypes.RELOAD_TOKEN;
  constructor() {}
}

export class LogIn implements Action {
  readonly type = AuthActionTypes.LOGIN;
  constructor(public payload: { username: string; password: string }) {}
}

export class LogInSuccess implements Action {
  readonly type = AuthActionTypes.LOGIN_SUCCESS;
  constructor(public readonly payload: { accessToken: string }) {}
}

export class LogInFailure implements Action {
  readonly type = AuthActionTypes.LOGIN_FAILURE;
  constructor(public readonly err: any) {}
}

export class SignUp implements Action {
  readonly type = AuthActionTypes.SIGNUP;
  constructor(
    public readonly payload: {
      name: string;
      username: string;
      password: string;
    }
  ) {}
}

export class SignUpSuccess implements Action {
  readonly type = AuthActionTypes.SIGNUP_SUCCESS;
  constructor(public readonly payload: { accessToken: string }) {}
}

export class SignUpFailure implements Action {
  readonly type = AuthActionTypes.SIGNUP_FAILURE;
  constructor(public readonly err: any) {}
}

export class LogOut implements Action {
  readonly type = AuthActionTypes.LOGOUT;
  constructor() {}
}

export type AllAuthActions =
  | LoadToken
  | ReloadToken
  | LogIn
  | LogInSuccess
  | LogInFailure
  | SignUp
  | SignUpSuccess
  | SignUpFailure
  | LogOut;
