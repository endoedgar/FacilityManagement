import { AuthState } from "./auth.state";
import { UsersState } from './users.state';
import { FacilityState } from './facility.state';

export interface AppState {
  auth: AuthState;
  facility: FacilityState;
  users: UsersState;
}