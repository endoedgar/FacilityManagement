import * as auth from "./reducers/auth.reducers";
import * as facility from "./reducers/facility.reducers";
import { createFeatureSelector } from "@ngrx/store";

export interface AppState {
  auth: auth.State;
  facility: facility.State;
}

export const reducers = {
  auth: auth.reducer,
  facility: facility.reducer
};

export const selectAuthState = createFeatureSelector<AppState>("auth");
export const selectFacilityState = createFeatureSelector<AppState>("facility");
