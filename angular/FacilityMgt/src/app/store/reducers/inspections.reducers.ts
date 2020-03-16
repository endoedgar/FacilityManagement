import { createReducer, on } from "@ngrx/store";
import { initialInspectionsState, inspectionsAdapter } from '../states/inspections.state';
import { LoadInspections, LoadInspection, LoadInspectionsSuccess, LoadInspectionSuccess, LoadInspectionsFailure, LoadInspectionFailure } from '../actions/inspections.actions';

export const reducer = createReducer(
  initialInspectionsState,
  on(LoadInspections, LoadInspection, (state, action) => ({
    ...state,
    selectedInspectionId: null,
    loading: true
  })),
  on(LoadInspectionsSuccess, (state, action) =>
    inspectionsAdapter.setAll(action.inspections, {
      ...state,
      error: null,
      loading: false
    })
  ),
  on(LoadInspectionSuccess, (state, action) =>
    inspectionsAdapter.addOne(action.inspection, {
      ...state,
      error: null,
      loading: false,
      selectedInspectionId: action.inspection._id
    })
  ),
  on(LoadInspectionsFailure, LoadInspectionFailure, (state, action) => ({
    ...initialInspectionsState,
    error: action.err,
    loading: false
  }))
);
