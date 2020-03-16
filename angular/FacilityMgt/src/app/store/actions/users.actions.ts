import { Action } from "@ngrx/store";
import { User } from 'src/app/models/User';

export enum UserActionTypes {
  LOAD_USERS = "[Users] Load Users",
  LOAD_USERS_SUCCESS = "[Users] Load Users Success",
  LOAD_USERS_FAILURE = "[Users] Load Users Failure",
  LOAD_USER = "[Users] Load User",
  LOAD_USER_SUCCESS = "[Users] Load User Success",
  LOAD_USER_FAILURE = "[Users] Load User Failure"
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

export class LoadUser implements Action {
  readonly type = UserActionTypes.LOAD_USER;
  constructor(public username: string) {}
}

export class LoadUserSuccess implements Action {
  readonly type = UserActionTypes.LOAD_USER_SUCCESS;
  constructor(public user: User) {}
}

export class LoadUserFailure implements Action {
  readonly type = UserActionTypes.LOAD_USER_FAILURE;
  constructor(public readonly err: any) {}
}

export type AllUserActions =
  | LoadUsers
  | LoadUsersSuccess
  | LoadUsersFailure
  | LoadUser
  | LoadUserSuccess
  | LoadUserFailure;
