import { AllUserActions, UserActionTypes } from "../actions/users.actions";
import {
  initialUsersState,
  UsersState,
  usersAdapter
} from "../states/users.state";

export function reducer(
  state = initialUsersState,
  action: AllUserActions
): UsersState {
  switch (action.type) {
    case UserActionTypes.LOAD_USERS:
    case UserActionTypes.LOAD_USER: {
      return { ...state, loading: true };
    }
    case UserActionTypes.LOAD_USERS_SUCCESS: {
      return usersAdapter.setAll(action.users, {
        ...state,
        error: null,
        loading: false
      });
    }
    case UserActionTypes.LOAD_USER_SUCCESS: {
      return usersAdapter.addOne(action.user, {
        ...state,
        error: null,
        loading: false,
        selectedUserId: action.user._id
      });
    }
    case UserActionTypes.LOAD_USERS_FAILURE:
    case UserActionTypes.LOAD_USER_FAILURE: {
      return {
        ...initialUsersState,
        error: action.err,
        loading: false
      };
    }
    default:
      return state;
  }
}
