import { Action } from "@ngrx/store";

export enum FacilityActionTypes {
    ADD_FACILITY = "[FACILITY] AddFacility",
    ADD_FACILITY_SUCCESS = "[FACILITY] AddFacility Success",
    ADD_FACILITY_FAILURE = "[FACILITY] AddFacility Failure",
    CLEAR_ERROR_MESSAGE = "[FACILITY] Clear Error Message"
}

export class addFacility implements Action {
    readonly type = FacilityActionTypes.ADD_FACILITY;
    constructor(public payload: any) { }
   
}

export class addFacilitySuccess implements Action {
    readonly type = FacilityActionTypes.ADD_FACILITY_SUCCESS;
    constructor(public payload: any) { }
}

export class addFacilityFailure implements Action {
    readonly type = FacilityActionTypes.ADD_FACILITY_FAILURE;
    constructor(public payload: any) { }
}

export class ClearErrorMessage implements Action {
    readonly type = FacilityActionTypes.CLEAR_ERROR_MESSAGE;
    constructor() {}
  }



export type ALL =
    | addFacility
    | addFacilitySuccess
    | addFacilityFailure
    | ClearErrorMessage;
