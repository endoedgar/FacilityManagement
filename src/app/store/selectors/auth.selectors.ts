import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from '../states/auth.state';

export const selectAuthState = createFeatureSelector<AuthState>("auth");

export const selectAuthError = createSelector(
    selectAuthState,
    state => state.error
);

export const selectLoggedinUser = createSelector(
    selectAuthState,
    state => state.user
);

export const selectAuthLoading = createSelector(
    selectAuthState,
    state => state.loading
);