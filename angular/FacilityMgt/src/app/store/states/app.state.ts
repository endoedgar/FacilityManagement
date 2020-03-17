import { AuthState } from "./auth.state";
import { UsersState } from './users.state';
import { FacilityState } from './facility.state';
import { InspectionsState } from './inspections.state';
import { InspectionState } from './inspection.state';
import { FacilityReduxState } from './facility-redux.state';

export interface AppState {
  auth: AuthState
  facility: FacilityState
  facilityRedux: FacilityReduxState,
  users: UsersState
  inspections: InspectionsState
  inspection: InspectionState
}