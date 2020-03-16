import { createAction, props } from "@ngrx/store";
import { User } from "src/app/models/User";

export const LoadToken = createAction(
  "[Auth] Load Token",
  props<{ payload: { accessToken: string; userData: User } }>()
);

export const ReloadToken = createAction("[Auth] Reload Token");

export const LogIn = createAction(
  "[Auth] Login",
  props<{ username: string; password: string }>()
);

export const LogInSuccess = createAction(
  "[Auth] Login Success",
  props<{ accessToken: string }>()
);

export const LogInFailure = createAction(
  "[Auth] Login Failure",
  props<{ err: any }>()
);

export const SignUp = createAction(
  "[Auth] Signup",
  props<{
    name: string;
    username: string;
    password: string;
    email: string;
  }>()
);

export const SignUpSuccess = createAction(
  "[Auth] Signup Success",
  props<{ accessToken: string }>()
);

export const SignUpFailure = createAction(
  "[Auth] Signup Failure",
  props<{ err: any }>()
);

export const UpdateProfile = createAction(
  "[Auth] Update Profile",
  props<{ user: User }>()
);

export const UpdateProfileSuccess = createAction(
  "[Auth] Update Profile Success",
  props<{ accessToken: string }>()
);

export const UpdateProfileFailure = createAction(
  "[Auth] Update Profile Failure",
  props<{ err: any }>()
);

export const LogOut = createAction("[Auth] Logout");

export const AuthActionTypes = {
  LoadToken,
  ReloadToken,
  LogIn,
  LogInSuccess,
  LogInFailure,
  SignUp,
  SignUpSuccess,
  SignUpFailure,
  UpdateProfile,
  UpdateProfileSuccess,
  UpdateProfileFailure,
  LogOut
};
