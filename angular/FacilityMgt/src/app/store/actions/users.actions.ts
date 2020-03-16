import { Action } from "@ngrx/store";
import { User } from 'src/app/models/User';

export enum UserActionTypes {
  LOAD_USERS = "[Users] Load",
  LOAD_USERS_SUCCESS = "[Users] Load Success",
  LOAD_USERS_FAILURE = "[Users] Load Failure"
}

export class LoadUsers implements Action {
  readonly type = UserActionTypes.LOAD_USERS;
  constructor() {}
}

export class LoadUsersSuccess implements Action {
  readonly type = UserActionTypes.LOAD_USERS_SUCCESS;
  constructor(public users: User[]) {}
}

export class LoadUsersFailure implements Action {
  readonly type = UserActionTypes.LOAD_USERS_FAILURE;
  constructor(public readonly err: any) {}
}

export type ALL =
  | LoadUsers
  | LoadUsersSuccess
  | LoadUsersFailure;
