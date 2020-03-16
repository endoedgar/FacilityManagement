import { ALL, UserActionTypes } from "../actions/users.actions";
import {
  initialUsersState,
  UsersState,
  usersAdapter
} from "../states/users.state";

export function reducer(state = initialUsersState, action: ALL): UsersState {
  switch (action.type) {
    case UserActionTypes.LOAD_USERS: {
      return { ...state, loading: true };
    }
    case UserActionTypes.LOAD_USERS_SUCCESS: {
      return usersAdapter.setAll(action.users, {
        ...state,
        errorMessage: null,
        loading: false
      });
    }
    case UserActionTypes.LOAD_USERS_FAILURE:
      return {
        ...initialUsersState,
        loading: false
      };
    default:
      return state;
  }
}
