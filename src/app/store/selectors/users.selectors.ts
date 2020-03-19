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

export const getCurrentUsername = createSelector(
    selectUsersState,
    (state : UsersState) => state.selectedUserId
);

export const getCurrentUser = createSelector(
    selectUsersState,
    getCurrentUsername,
    state => state.entities[state.selectedUserId]
);

export const selectUsersLoading = createSelector(
    selectUsersState,
    state => state.loading
);