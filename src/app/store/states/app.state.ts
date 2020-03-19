import { AuthState } from "./auth.state";
import { UsersState } from './users.state';
import { InspectionState } from './inspection.state';
import { FacilityReduxState } from './facility-redux.state';

export interface AppState {
  auth: AuthState
  facilityRedux: FacilityReduxState,
  users: UsersState,
  inspection: InspectionState
}