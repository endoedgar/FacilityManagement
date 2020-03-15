import { usersAdapter, UsersState } from '../states/users.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const {
    selectAll: _selectAllUsers
} = usersAdapter.getSelectors();

export const selectUsersState = createFeatureSelector<UsersState>("users");

export const selectAllUsers = createSelector(
    selectUsersState,
    _selectAllUsers
);

export const selectUsersError = createSelector(
    selectUsersState,
    state => state.errorMessage
);