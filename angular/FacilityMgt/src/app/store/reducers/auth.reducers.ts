import { ALL, AuthActionTypes } from "../actions/auth.actions";
import { initialAuthState, AuthState } from "../states/auth.state";

export function reducer(state = initialAuthState, action: ALL): AuthState {
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
      if (token) {
        const tokenData = token
          .split(".")
          .slice(0, 2)
          .map(e => JSON.parse(atob(e)));

        return {
          ...state,
          isAuthenticated: true,
          user: {
            token: action.payload.token,
            ...tokenData[1]
          },
          errorMessage: null
        };
      } else return { ...state };
    }
    case AuthActionTypes.LOGOUT:
      return initialAuthState;
    default:
      return state;
  }
}
