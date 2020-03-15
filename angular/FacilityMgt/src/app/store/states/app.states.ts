import * as auth from "../reducers/auth.reducers";
import * as facility from "../reducers/facility.reducers";
import * as users from "../reducers/users.reducers";
import { AuthState } from "./auth.state";
import { UsersState } from './users.state';
import { FacilityState } from './facility.state';

export interface AppState {
  auth: AuthState;
  facility: FacilityState;
  users: UsersState;
}

export const reducers = {
  auth: auth.reducer,
  facility: facility.reducer,
  users: users.reducer
};