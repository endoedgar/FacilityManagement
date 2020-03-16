import { createFeatureSelector, createSelector } from '@ngrx/store';
import { inspectionsAdapter, InspectionsState } from '../states/inspections.state';

export const {
    selectAll: _selectAllInspections
} = inspectionsAdapter.getSelectors();

export const selectInspectionsState = createFeatureSelector<InspectionsState>("inspections");

export const selectAllInspections = createSelector(
    selectInspectionsState,
    _selectAllInspections
);

export const getCurrentInspectionId = createSelector(
    selectInspectionsState,
    (state : InspectionsState) => state.selectedInspectionId
);

export const getCurrentInspection = createSelector(
    selectInspectionsState,
    getCurrentInspectionId,
    state => state.entities[state.selectedInspectionId]
);

export const selectInspectionsLoading = createSelector(
    selectInspectionsState,
    state => state.loading
);