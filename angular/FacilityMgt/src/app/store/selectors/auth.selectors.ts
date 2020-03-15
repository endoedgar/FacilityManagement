import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from '../states/auth.state';

export const selectAuthState = createFeatureSelector<AuthState>("auth");

export const selectAuthError = createSelector(
    selectAuthState,
    state => state.errorMessage
);