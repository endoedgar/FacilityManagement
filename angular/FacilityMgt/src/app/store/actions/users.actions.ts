import { createAction, props } from "@ngrx/store";
import { User } from "src/app/models/User";

export const LoadUsers = createAction("[Users] Load Users");

export const LoadUsersSuccess = createAction(
  "[Users] Load Users Success",
  props<{ users: User[] }>()
);

export const LoadUsersFailure = createAction(
  "[Users] Load Users Failure",
  props<{ err: any }>()
);

export const LoadUser = createAction(
  "[Users] Load User",
  props<{ username: string }>()
);

export const LoadUserSuccess = createAction(
  "[Users] Load User Success",
  props<{ user: User }>()
);

export const LoadUserFailure = createAction(
  "[Users] Load User Failure",
  props<{ err: any }>()
);

export const AllUserActions = {
  LoadUsers,
  LoadUsersSuccess,
  LoadUsersFailure,
  LoadUser,
  LoadUserSuccess,
  LoadUserFailure
};
