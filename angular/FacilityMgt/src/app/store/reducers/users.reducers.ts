import { User } from "src/app/models/User";
import { ALL, AuthActionTypes } from "../actions/users.actions";

export interface State {
  users: User[] | null;
  errorMessage: string | null;
}

export const initialState: State = {
  users: null,
  errorMessage: null
};

export function reducer(state = initialState, action: ALL): State {
  switch (action.type) {
    case AuthActionTypes.LOAD_USERS_SUCCESS: {
      return {
        ...state,
        users: action.payload.data,
        errorMessage: null
      };
    }
    case AuthActionTypes.LOAD_USERS_FAILURE:
      return {
        ...initialState,
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
