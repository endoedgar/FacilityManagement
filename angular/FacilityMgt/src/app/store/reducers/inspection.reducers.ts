import { createReducer, on } from '@ngrx/store';
import { getInspections, getInspectionsSuccess, getInspectionsFailure, getInspection, getInspectionSuccess, getInspectionFailure, getFacilityInspections, getFacilityInspectionsSuccess, getFacilityInspectionsFailure, createInspection, createInspectionSuccess, createInspectionFailure, deleteInspection, deleteInspectionSuccess, deleteInspectionFailure, updateInspection, updateInspectionSuccess, updateInspectionFailure } from "../actions/inspection.actions";
import {
    initialInspectionsState,
    inspectionAdapter,
    successAdapter
} from "../states/inspection.state";

export const reducer = createReducer(initialInspectionsState,
    on(getInspections, getInspection, 
        getFacilityInspections, createInspection, 
        updateInspection, deleteInspection, 
        state => ({ ...state, selectedInspectionId: null, loading: true })),
    on(getInspectionsSuccess,
        (state, { inspections }) => inspectionAdapter.addMany(inspections, {
            ...state,
            loading: false,
            errorMessage: null
        })),
    on(getInspectionsFailure, (state, { error }) => ({
        ...state,
        loading: false,
        errorMessage: error.message
    })),
    on(getInspectionSuccess, (state, { inspection }) => inspectionAdapter.addOne(inspection, {
        ...state,
        loading: false,
        errorMessage: null,
        selectedInspectionId: inspection._id
    })),
    on(getInspectionFailure, (state, { error }) => ({
        ...state,
        loading: false,
        errorMessage: error.message
    })),
    on(getFacilityInspectionsSuccess, (state, { inspections }) => inspectionAdapter.addMany(inspections, {
            ...state,
            loading: false,
            errorMessage: null
        })),
    on(getFacilityInspectionsFailure, (state, { error }) => ({
        ...state,
        loading: false,
        errorMessage: error.message
    })),
    on(createInspectionSuccess, (state, { inspection }) => inspectionAdapter.addOne(inspection, {
        ...state,
        loading: false,
        errorMessage: null
    })),
    on(createInspectionFailure, (state, { error }) => ({
        ...state,
        loading: false,
        errorMessage: error.message
    })),
    on(updateInspectionSuccess, (state, { success }) => successAdapter.addOne(success, {
        ...state,
        loading: false,
        errorMessage: null
    })),
    on(updateInspectionFailure, (state, { error }) => ({
        ...state,
        loading: false,
        errorMessage: error.message
    })),
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
