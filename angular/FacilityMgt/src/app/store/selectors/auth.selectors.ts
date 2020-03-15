import { createFeatureSelector } from '@ngrx/store';
import { AuthState } from '../states/auth.state';

export const selectAuthState = createFeatureSelector<AuthState>("auth");