import { createAction, props } from "@ngrx/store";
import { Inspection } from 'src/app/models/Inspection';

export const LoadInspections = createAction("[Inspections] Load Inspections");

export const LoadInspectionsSuccess = createAction(
  "[Inspections] Load Inspections Success",
  props<{ inspections: Inspection[] }>()
);

export const LoadInspectionsFailure = createAction(
  "[Inspections] Load Inspections Failure",
  props<{ err: any }>()
);

export const LoadInspection = createAction(
  "[Inspections] Load Inspection",
  props<{ inspection_id: string }>()
);

export const LoadInspectionSuccess = createAction(
  "[Inspections] Load Inspection Success",
  props<{ inspection: Inspection }>()
);

export const LoadInspectionFailure = createAction(
  "[Inspections] Load Inspection Failure",
  props<{ err: any }>()
);

export const AllUserActions = {
  LoadInspections,
  LoadInspectionsSuccess,
  LoadInspectionsFailure,
  LoadInspection,
  LoadInspectionSuccess,
  LoadInspectionFailure
};
