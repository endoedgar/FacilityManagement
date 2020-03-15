import { ALL, AuthActionTypes } from "../actions/users.actions";
import {
  initialUsersState,
  UsersState,
  usersAdapter
} from "../states/users.state";

export function reducer(state = initialUsersState, action: ALL): UsersState {
  switch (action.type) {
    case AuthActionTypes.LOAD_USERS: {
      return { ...state, loading: true };
    }
    case AuthActionTypes.LOAD_USERS_SUCCESS: {
      return usersAdapter.addMany(action.users, {
        ...state,
        errorMessage: null,
        loading: false
      });
    }
    case AuthActionTypes.LOAD_USERS_FAILURE:
      return {
        ...initialUsersState,
        loading: false,
        errorMessage: action.payload.error.error.message
          ? action.payload.error.error.message
          : action.payload.error.message
      };
    case AuthActionTypes.CLEAR_ERROR_MESSAGE:
      return {
        ...state,
        errorMessage: null
      };
    default:
      return state;
  }
}
