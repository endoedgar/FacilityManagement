import {
  LoadUsers,
  LoadUser,
  LoadUserSuccess,
  LoadUsersSuccess,
  LoadUsersFailure,
  LoadUserFailure
} from "../actions/users.actions";
import {
  initialUsersState,
  usersAdapter
} from "../states/users.state";
import { createReducer, on } from "@ngrx/store";

export const reducer = createReducer(
  initialUsersState,
  on(LoadUsers, LoadUser, (state, action) => ({ ...state, loading: true })),
  on(LoadUsersSuccess, (state, action) =>
    usersAdapter.setAll(action.users, {
      ...state,
      error: null,
      loading: false
    })
  ),
  on(LoadUserSuccess, (state, action) =>
    usersAdapter.addOne(action.user, {
      ...state,
      error: null,
      loading: false,
      selectedUserId: action.user._id
    })
  ),
  on(LoadUsersFailure, LoadUserFailure, (state, action) => ({
    ...initialUsersState,
    error: action.err,
    loading: false
  }))
);
