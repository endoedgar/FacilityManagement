import { Action } from "@ngrx/store";
import { User } from 'src/app/models/User';

export enum InspectionsActionTypes {
  LOAD_INSPECTIONS = "[Inspections] Load Inspections",
  LOAD_INSPECTIONS_SUCCESS = "[Inspections] Load Inspections Success",
  LOAD_INSPECTIONS_FAILURE = "[Inspections] Load Inspections Failure",
  LOAD_INSPECTION = "[Inspections] Load Inspection",
  LOAD_INSPECTION_SUCCESS = "[Inspections] Load Inspection Success",
  LOAD_INSPECTION_FAILURE = "[Inspections] Load Inspection Failure"
}

export class LoadInspections implements Action {
  readonly type = InspectionsActionTypes.LOAD_INSPECTIONS;
  constructor() {}
}

export class LoadInspectionsSuccess implements Action {
  readonly type = InspectionsActionTypes.LOAD_INSPECTIONS_SUCCESS;
  constructor(public users: User[]) {}
}

export class LoadInspectionsFailure implements Action {
  readonly type = InspectionsActionTypes.LOAD_INSPECTIONS_FAILURE;
  constructor(public readonly err: any) {}
}

export class LoadInspection implements Action {
  readonly type = InspectionsActionTypes.LOAD_INSPECTION;
  constructor(public inspection_id: string) {}
}

export class LoadInspectionSuccess implements Action {
  readonly type = InspectionsActionTypes.LOAD_INSPECTION_SUCCESS;
  constructor(public inspection: User) {}
}

export class LoadInspectionFailure implements Action {
  readonly type = InspectionsActionTypes.LOAD_INSPECTION_FAILURE;
  constructor(public readonly err: any) {}
}

export type AllInspectionActions =
  | LoadInspections
  | LoadInspectionsSuccess
  | LoadInspectionsFailure
  | LoadInspection
  | LoadInspectionSuccess
  | LoadInspectionFailure;
