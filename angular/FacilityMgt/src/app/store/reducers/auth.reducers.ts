import { ALL, AuthActionTypes } from "../actions/auth.actions";
import { initialAuthState, AuthState } from "../states/auth.state";

export function reducer(state = initialAuthState, action: ALL): AuthState {
  switch (action.type) {
    case AuthActionTypes.SIGNUP:
    case AuthActionTypes.LOGIN: {
      return {
        ...state,
        error: null,
        loading: true
      };
    }
    case AuthActionTypes.SIGNUP_SUCCESS: 
    case AuthActionTypes.LOGIN_SUCCESS: {
      return {
        ...state,
        error: null,
        loading: false
      };
    }
    case AuthActionTypes.LOGIN_FAILURE:
    case AuthActionTypes.SIGNUP_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        error: action.err,
        loading: false
      };
    case AuthActionTypes.CLEAR_ERROR_MESSAGE:
      return {
        ...state,
        error: null
      };
    case AuthActionTypes.LOAD_TOKEN: {
      const token = action.payload.accessToken;
      if (token) {
        return {
          ...state,
          isAuthenticated: true,
          user: {
            token: action.payload.accessToken,
            ...action.payload.userData
          },
          error: null
        };
      } else return { ...state };
    }
    case AuthActionTypes.LOGOUT:
      return initialAuthState;
    default:
      return state;
  }
}
