import { createReducer, on } from '@ngrx/store';
import { getInspections, getInspectionsSuccess, getInspectionsFailure, getInspection, getInspectionSuccess, getInspectionFailure, getFacilityInspections, getFacilityInspectionsSuccess, getFacilityInspectionsFailure, createInspection, createInspectionSuccess, createInspectionFailure, deleteInspection, deleteInspectionSuccess, deleteInspectionFailure, updateInspection, updateInspectionSuccess, updateInspectionFailure, selectInspection, deselectInspection, changeInspectionMapMode } from "../actions/inspection.actions";
import {
    initialInspectionsState,
    inspectionAdapter,
    InspectionMapModeEnum,
} from "../states/inspection.state";

export const reducer = createReducer(initialInspectionsState,
    on(getInspections, getInspection,
        getFacilityInspections, createInspection,
        updateInspection, deleteInspection,
        state => ({ ...state, loading: true })),
    on(getInspectionsSuccess,
        (state, { inspections }) => inspectionAdapter.setAll(inspections, {
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
    on(getFacilityInspectionsSuccess, (state, { inspections }) => inspectionAdapter.setAll(inspections, {
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
        errorMessage: null,
        mapMode: InspectionMapModeEnum.NONE
    })),
    on(createInspectionFailure, (state, { error }) => ({
        ...state,
        loading: false,
        errorMessage: error.message
    })),
    on(updateInspectionSuccess, (state, action) => inspectionAdapter.updateOne(action.inspection, {
        ...state,
        loading: false,
        errorMessage: null,
        mapMode: InspectionMapModeEnum.NONE
    })),
    on(updateInspectionFailure, (state, { error }) => ({
        ...state,
        loading: false,
        errorMessage: error.message
    })),
    on(deleteInspectionSuccess, (state, action) => 
    inspectionAdapter.removeOne(action.inspection._id, {
        ...state,
        loading: false,
        errorMessage: null,
        mapMode: InspectionMapModeEnum.NONE
    })),
    on(deleteInspectionFailure, (state, { error }) => ({
        ...state,
        loading: false,
        errorMessage: error.message
    })),
    on(selectInspection, (state, action) => ({
        ...state,
        selectedInspectionId: action.inspection._id
    })),
    on(deselectInspection, (state, action) => ({
        ...state,
        selectedInspectionId: null
    })),
    on(changeInspectionMapMode, (state, action) => ({ ...state, mapMode: action.mode }))
);
