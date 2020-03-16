import * as auth from "./reducers/auth.reducers";
import * as facility from "./reducers/facility.reducers";
import * as users from "./reducers/users.reducers";
import { ActionReducerMap } from '@ngrx/store';
import { AppState } from './states/app.state';

export const reducers : ActionReducerMap<AppState> = {
    auth: auth.reducer,
    facility: facility.reducer,
    users: users.reducer
};