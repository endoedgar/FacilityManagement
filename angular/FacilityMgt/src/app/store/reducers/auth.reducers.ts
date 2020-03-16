import { createReducer, on } from "@ngrx/store";

import {
  SignUp,
  LogIn,
  SignUpSuccess,
  LogInSuccess,
  SignUpFailure,
  LogInFailure,
  LoadToken,
  LogOut
} from "../actions/auth.actions";
import { initialAuthState } from "../states/auth.state";

export const reducer = createReducer(
  initialAuthState,
  on(SignUp, LogIn, (state, action) => {
    return {
      ...state,
      error: null,
      loading: true
    };
  }),
  on(SignUpSuccess, LogInSuccess, (state, action) => {
    return {
      ...state,
      error: null,
      loading: false
    };
  }),
  on(SignUpFailure, LogInFailure, (state, action) => {
    return {
      ...state,
      user: null,
      error: action.err,
      loading: false
    };
  }),
  on(LoadToken, (state, action) => {
    const token = action.payload.accessToken;
    if (token) {
      return {
        ...state,
        user: {
          token: action.payload.accessToken,
          ...action.payload.userData
        },
        error: null
      };
    } else return { ...state };
  }),
  on(LogOut, (state, action) => initialAuthState)
);
