import { ActionReducerMap } from '@ngrx/store';

import * as auth from "./reducers/auth.reducers";
import * as facilityRedux from "./reducers/facility-redux.reducers";
import * as users from "./reducers/users.reducers";
import * as inspection from "./reducers/inspection.reducers";

import { AppState } from './states/app.state';

export const reducers : ActionReducerMap<AppState> = {
    auth: auth.reducer,
    facilityRedux: facilityRedux.reducer,
    users: users.reducer,
    inspection: inspection.reducer
};