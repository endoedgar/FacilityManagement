import * as auth from "./reducers/auth.reducers";
import * as facility from "./reducers/facility.reducers";
import * as facilityRedux from "./reducers/facility-redux.reducers";
import * as users from "./reducers/users.reducers";
import * as inspections from "./reducers/inspections.reducers";
import * as inspection from "./reducers/inspection.reducers";
import { ActionReducerMap } from '@ngrx/store';
import { AppState } from './states/app.state';

export const reducers : ActionReducerMap<AppState> = {
    auth: auth.reducer,
    facility: facility.reducer,
    facilityRedux: facilityRedux.reducer,
    users: users.reducer,
    inspections: inspections.reducer,
    inspection: inspection.reducer
};