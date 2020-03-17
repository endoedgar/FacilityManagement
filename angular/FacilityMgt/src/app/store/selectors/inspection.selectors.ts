import { createFeatureSelector, createSelector } from '@ngrx/store';
import { inspectionAdapter, InspectionState } from '../states/inspection.state';

export const {
    selectAll: _selectAllInspections
} = inspectionAdapter.getSelectors();

export const selectInspectionState = createFeatureSelector<InspectionState>("inspection");

export const selectAllInspections = createSelector(
    selectInspectionState,
    _selectAllInspections
);


export const selectCurrentInspectionId = createSelector(
    selectInspectionState,
    (state: InspectionState) => state.selectedInspectionId
);

export const selectCurrentInspection = createSelector(
    selectInspectionState,
    selectCurrentInspectionId,
    state => state.entities[state.selectedInspectionId]
);


export const selectInspectionLoading = createSelector(
    selectInspectionState,
    state => state.loading
);

export const selectInspectionError = createSelector(
    selectInspectionState,
    state => state.errorMessage
);