import { createFeatureSelector, createSelector } from '@ngrx/store';
import { facilityAdapter, FacilityReduxState } from '../states/facility-redux.state';

export const {
    selectAll: _selectAllFacilities
} = facilityAdapter.getSelectors();

export const selectFacilityState$ = createFeatureSelector<FacilityReduxState>("facilityRedux");

export const selectAllFacilities$ = createSelector(
    selectFacilityState$,
    _selectAllFacilities
);

export const getCurrentFacilityId$ = createSelector(
    selectFacilityState$,
    (state : FacilityReduxState) => state.selectedFacilityId
);

export const getCurrentFacility$ = createSelector(
    selectFacilityState$,
    getCurrentFacilityId$,
    state => state.entities[state.selectedFacilityId]
);

export const selectFacilitiesLoading$ = createSelector(
    selectFacilityState$,
    state => state.loading
);

export const selectFacilitiesMapMode$ = createSelector(
    selectFacilityState$,
    state => state.mapMode
);