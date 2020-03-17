import { createAction, props } from "@ngrx/store";
import { Inspection } from 'src/app/models/Inspection';

export enum InspectionActionTypes {
    GET_INSPECTIONS = "[Inspection] Get Inspections",
    GET_INSPECTIONS_SUCCESS = "[Inspection] Get Inspections Success",
    GET_INSPECTIONS_FAILURE = "[Inspection] Get Inspections Failure",
    GET_INSPECTION = "[Inspection] Get Inspection",
    GET_INSPECTION_SUCCESS = "[Inspection] Get Inspection Success",
    GET_INSPECTION_FAILURE = "[Inspection] Get Inspection Failure",
    GET_FACILITY_INSPECTIONS = "[Inspection] Get Facility Inspection",
    GET_FACILITY_INSPECTIONS_SUCCESS = "[Inspection] Get Facility Inspection Success",
    GET_FACILITY_INSPECTIONS_FAILURE = "[Inspection] Get Facility Inspection Failure",
    CREATE_INSPECTION = "[Inspection] Create Inspection",
    CREATE_INSPECTION_SUCCESS = "[Inspection] Create Inspection Success",
    CREATE_INSPECTION_FAILURE = "[Inspection] Create Inspection Failure",
    UPDATE_INSPECTION = "[Inspection] Update Inspection",
    UPDATE_INSPECTION_SUCCESS = "[Inspection] Update Inspection Success",
    UPDATE_INSPECTION_FAILURE = "[Inspection] Update Inspection Failure",
    DELETE_INSPECTION = "[Inspection] Delete Inspection",
    DELETE_INSPECTION_SUCCESS = "[Inspection] Delete Inspection Success",
    DELETE_INSPECTION_FAILURE = "[Inspection] Delete Inspection Failure"
}

export const getInspections =
    createAction(InspectionActionTypes.GET_INSPECTIONS);
export const getInspectionsSuccess =
    createAction(InspectionActionTypes.GET_INSPECTIONS_SUCCESS, props<{ inspections: Inspection[] }>());
export const getInspectionsFailure =
    createAction(InspectionActionTypes.GET_INSPECTIONS_FAILURE, props<{ error: any }>());



export const getInspection =
    createAction(InspectionActionTypes.GET_INSPECTION, props<{ inspectionId: string }>());
export const getInspectionSuccess =
    createAction(InspectionActionTypes.GET_INSPECTION_SUCCESS, props<{ inspection: Inspection }>());
export const getInspectionFailure =
    createAction(InspectionActionTypes.GET_INSPECTION_FAILURE, props<{ error: any }>());



export const getFacilityInspections =
    createAction(InspectionActionTypes.GET_FACILITY_INSPECTIONS, props<{ facilityId: string }>());
export const getFacilityInspectionsSuccess =
    createAction(InspectionActionTypes.GET_FACILITY_INSPECTIONS_SUCCESS, props<{ inspections: Inspection[] }>());
export const getFacilityInspectionsFailure =
    createAction(InspectionActionTypes.GET_FACILITY_INSPECTIONS_FAILURE, props<{ error: any }>());



export const createInspection =
    createAction(InspectionActionTypes.CREATE_INSPECTION, props<{ inspection: Inspection }>());
export const createInspectionSuccess =
    createAction(InspectionActionTypes.CREATE_INSPECTION_SUCCESS, props<{ inspection: Inspection }>());
export const createInspectionFailure =
    createAction(InspectionActionTypes.CREATE_INSPECTION_FAILURE, props<{ error: any }>());



export const updateInspection =
    createAction(InspectionActionTypes.UPDATE_INSPECTION, props<{ inspection: Inspection }>());
export const updateInspectionSuccess =
    createAction(InspectionActionTypes.UPDATE_INSPECTION_SUCCESS, props<{ success: string }>());
export const updateInspectionFailure =
    createAction(InspectionActionTypes.UPDATE_INSPECTION_FAILURE, props<{ error: any }>());



export const deleteInspection =
    createAction(InspectionActionTypes.DELETE_INSPECTION);
export const deleteInspectionSuccess =
    createAction(InspectionActionTypes.DELETE_INSPECTION_SUCCESS, props<{ success: string }>());
export const deleteInspectionFailure =
    createAction(InspectionActionTypes.DELETE_INSPECTION_FAILURE, props<{ error: any }>());
