import { createReducer, on } from '@ngrx/store';
import { getInspections, getInspectionsSuccess, getInspectionsFailure, getInspection, getInspectionSuccess, getInspectionFailure, getFacilityInspections, getFacilityInspectionsSuccess, getFacilityInspectionsFailure, createInspection, createInspectionSuccess, createInspectionFailure, deleteInspection, deleteInspectionSuccess, deleteInspectionFailure, updateInspection, updateInspectionSuccess, updateInspectionFailure } from "../actions/inspection.actions";
import {
    initialInspectionsState,
    inspectionAdapter,
    successAdapter
} from "../states/inspection.state";

export const reducer = createReducer(initialInspectionsState,
    on(getInspections, state => ({ ...state, loading: true })),
    on(getInspectionsSuccess,
        (state, { inspections }) => inspectionAdapter.addMany(inspections, {
            ...state,
            errorMessage: null,
            loading: false
        })),
    on(getInspectionsFailure, (state, { error }) => ({
        ...state,
        loading: false,
        errorMessage: error.message
    })),
    on(getInspection, state => ({ ...state, loading: true })),
    on(getInspectionSuccess, (state, { inspection }) => inspectionAdapter.addOne(inspection, {
        ...state,
        errorMessage: null,
        loading: false
    })),
    on(getInspectionFailure, (state, { error }) => ({
        ...state,
        loading: false,
        errorMessage: error.message
    })),
    on(getFacilityInspections, state => ({ ...state, loading: true })),
    on(getFacilityInspectionsSuccess,
        (state, { inspections }) => inspectionAdapter.addMany(inspections, {
            ...state,
            errorMessage: null,
            loading: false
        })),
    on(getFacilityInspectionsFailure, (state, { error }) => ({
        ...state,
        loading: false,
        errorMessage: error.message
    })),
    on(createInspection, state => ({ ...state, loading: true })),
    on(createInspectionSuccess, (state, { inspection }) => inspectionAdapter.addOne(inspection, {
        ...state,
        errorMessage: null,
        loading: false
    })),
    on(createInspectionFailure, (state, { error }) => ({
        ...state,
        loading: false,
        errorMessage: error.message
    })),
    on(updateInspection, state => ({ ...state, loading: true })),
    on(updateInspectionSuccess, (state, { success }) => successAdapter.addOne(success, {
        ...state,
        errorMessage: null,
        loading: false
    })),
    on(updateInspectionFailure, (state, { error }) => ({
        ...state,
        loading: false,
        errorMessage: error.message
    })),
    on(deleteInspection, state => ({ ...state, loading: true })),
    on(deleteInspectionSuccess, (state, { success }) => successAdapter.addOne(success, {
        ...state,
        errorMessage: null,
        loading: false
    })),
    on(deleteInspectionFailure, (state, { error }) => ({
        ...state,
        loading: false,
        errorMessage: error.message
    })),
);
