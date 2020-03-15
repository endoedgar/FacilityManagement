import { Action } from "@ngrx/store";

export enum AuthActionTypes {
  LOAD_TOKEN = "[Auth] Load Token",
  RELOAD_TOKEN = "[Auth] Reload Token",
  LOGIN = "[Auth] Login",
  LOGIN_SUCCESS = "[Auth] Login Success",
  LOGIN_FAILURE = "[Auth] Login Failure",
  SIGNUP = "[Auth] Signup",
  SIGNUP_SUCCESS = '[Auth] Signup Success',
  SIGNUP_FAILURE = '[Auth] Signup Failure',
  CLEAR_ERROR_MESSAGE = '[Auth] Clear Error Message',
  LOGOUT = "[Auth] Logout"
}

export class LoadToken implements Action {
  readonly type = AuthActionTypes.LOAD_TOKEN;
  constructor(public payload: any) {}
}

export class ReloadToken implements Action {
  readonly type = AuthActionTypes.RELOAD_TOKEN;
  constructor() {}
}

export class LogIn implements Action {
  readonly type = AuthActionTypes.LOGIN;
  constructor(public payload: any) {}
}

export class LogInSuccess implements Action {
  readonly type = AuthActionTypes.LOGIN_SUCCESS;
  constructor(public payload: any) {}
}

export class LogInFailure implements Action {
  readonly type = AuthActionTypes.LOGIN_FAILURE;
  constructor(public payload: any) {}
}

export class SignUp implements Action {
  readonly type = AuthActionTypes.SIGNUP;
  constructor(public payload: any) {}
}

export class SignUpSuccess implements Action {
  readonly type = AuthActionTypes.SIGNUP_SUCCESS;
  constructor(public payload: any) {}
}

export class SignUpFailure implements Action {
    readonly type = AuthActionTypes.SIGNUP_FAILURE;
    constructor(public payload: any) {}
  }

export class ClearErrorMessage implements Action {
  readonly type = AuthActionTypes.CLEAR_ERROR_MESSAGE;
  constructor() {}
}

export class LogOut implements Action {
  readonly type = AuthActionTypes.LOGOUT;
  constructor() {}
}

export type ALL =
  | LoadToken
  | ReloadToken
  | LogIn
  | LogInSuccess
  | LogInFailure
  | SignUp
  | SignUpSuccess
  | SignUpFailure
  | ClearErrorMessage
  | LogOut;
