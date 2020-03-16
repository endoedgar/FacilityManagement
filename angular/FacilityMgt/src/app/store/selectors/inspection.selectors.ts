import { inspectionAdapter, InspectionState } from '../states/inspection.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const {
    selectAll: _selectAllInspections
} = inspectionAdapter.getSelectors();

export const selectInspectionState = createFeatureSelector<InspectionState>("inspection");

export const selectAllInspections = createSelector(
    selectInspectionState,
    _selectAllInspections
);

export const selectInspectionsError = createSelector(
    selectInspectionState,
    state => state.errorMessage
);