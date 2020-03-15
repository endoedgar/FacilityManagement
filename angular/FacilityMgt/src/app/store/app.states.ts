import * as auth from "./reducers/auth.reducers";
import * as facility from "./reducers/facility.reducers";
import * as users from "./reducers/users.reducers";
import { createFeatureSelector } from "@ngrx/store";

export interface AppState {
  auth: auth.State;
  facility: facility.State;
  users: users.State;
}

export const reducers = {
  auth: auth.reducer,
  facility: facility.reducer,
  users: users.reducer
};

export const selectAuthState = createFeatureSelector<AppState>("auth");
export const selectFacilityState = createFeatureSelector<AppState>("facility");
export const selectUsersState = createFeatureSelector<AppState>("users");
