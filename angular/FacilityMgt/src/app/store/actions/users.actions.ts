import { Action } from "@ngrx/store";
import { User } from 'src/app/models/User';

export enum AuthActionTypes {
  LOAD_USERS = "[Users] Load",
  LOAD_USERS_SUCCESS = "[Users] Load Success",
  LOAD_USERS_FAILURE = "[Users] Load Failure",
  CLEAR_ERROR_MESSAGE = '[Users] Clear Error Message',
}

export class LoadUsers implements Action {
  readonly type = AuthActionTypes.LOAD_USERS;
  constructor() {}
}

export class LoadUsersSuccess implements Action {
  readonly type = AuthActionTypes.LOAD_USERS_SUCCESS;
  constructor(public users: User[]) {}
}

export class LoadUsersFailure implements Action {
  readonly type = AuthActionTypes.LOAD_USERS_FAILURE;
  constructor(public payload: any) {}
}

export class ClearErrorMessage implements Action {
  readonly type = AuthActionTypes.CLEAR_ERROR_MESSAGE;
  constructor() {}
}

export type ALL =
  | LoadUsers
  | LoadUsersSuccess
  | LoadUsersFailure
  | ClearErrorMessage;
