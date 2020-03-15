import { User } from "src/app/models/User";
import { ALL, AuthActionTypes } from "../actions/auth.actions";

export interface State {
  isAuthenticated: boolean;
  user: User | null;
  errorMessage: string | null;
}

export const initialState: State = {
  isAuthenticated: false,
  user: null,
  errorMessage: null
};

export function reducer(state = initialState, action: ALL): State {
  switch (action.type) {
    case AuthActionTypes.LOGIN_SUCCESS: {
      return {
        ...state,
        errorMessage: null
      };
    }
    case AuthActionTypes.LOGIN_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        errorMessage: action.payload.error.error.message
          ? action.payload.error.error.message
          : action.payload.error.message
      };
    case AuthActionTypes.SIGNUP_SUCCESS: {
      return {
        ...state,
        errorMessage: null
      };
    }
    case AuthActionTypes.SIGNUP_FAILURE:
      return {
        ...state,
        errorMessage: action.payload.error.error.message
          ? action.payload.error.error.message
          : action.payload.error.message
      };
    case AuthActionTypes.CLEAR_ERROR_MESSAGE:
      return {
        ...state,
        errorMessage: null
      };
    case AuthActionTypes.LOAD_TOKEN: {
      const token = action.payload.token;
      console.log("LOAD TOKEN");
      if (token) {
        const tokenData = token
          .split(".")
          .slice(0, 2)
          .map(e => JSON.parse(atob(e)));

          console.log(state);

        return {
          ...state,
          isAuthenticated: true,
          user: {
            token: action.payload.token,
            ...tokenData[1]
          },
          errorMessage: null
        };
      } else return {...state};
    }
    case AuthActionTypes.LOGOUT:
      return initialState;
    default:
      return state;
  }
}
