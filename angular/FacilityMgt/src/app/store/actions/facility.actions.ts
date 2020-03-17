import { Action } from "@ngrx/store";

export enum FacilityActionTypes {
    ADD_FACILITY = "[FACILITY] AddFacility",
    ADD_FACILITY_SUCCESS = "[FACILITY] AddFacility Success",
    ADD_FACILITY_FAILURE = "[FACILITY] AddFacility Failure",
    GET_FACILITIES = "[FACILITY] GetFacilities",
    GET_FACILITIES_SUCCESS = "[FACILITY] GetFacilities Success",
    GET_FACILITIES_FAILURE = "[FACILITY] GetFacilities Failure",
    DELETE_FACILITY = "[FACILITY] DeleteFacility",
    DELETE_FACILITY_SUCCESS = "[FACILITY] DeleteFacility Success",
    DELETE_FACILITY_FAILURE = "[FACILITY] DeleteFacility Failure",
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
    constructor(public payload: { err: any }) { }
}

export class DeleteFacility implements Action {
    readonly type = FacilityActionTypes.DELETE_FACILITY;
    constructor(public payload: any) { }
   
}

export class DeleteFacilitySuccess implements Action {
    readonly type = FacilityActionTypes.DELETE_FACILITY_SUCCESS;
    constructor(public payload: any) { }
}

export class DeleteFacilityFailure implements Action {
    readonly type = FacilityActionTypes.DELETE_FACILITY_FAILURE;
    constructor(public payload: { err: any }) { }
}



export class GetFacilities implements Action {
    readonly type = FacilityActionTypes.GET_FACILITIES;
    constructor() { }
   
}

export class GetFacilitiesSuccess implements Action {
    readonly type = FacilityActionTypes.GET_FACILITIES_SUCCESS;
    constructor(public payload: any) { }
}

export class GetFacilitiesFailure implements Action {
    readonly type = FacilityActionTypes.GET_FACILITIES_FAILURE;
    constructor(public payload: { err: any }) { }
}


export type ALL =
    | addFacility
    | addFacilitySuccess
    | addFacilityFailure
    | GetFacilities
    | GetFacilitiesSuccess
    | GetFacilitiesFailure
    | DeleteFacility
    | DeleteFacilitySuccess
    | DeleteFacilityFailure;
