import { Facility } from "src/app/models/Facility";
import { ALL, FacilityActionTypes } from "../actions/facility.actions";

export interface State {
  facility: Facility | null;
  errorMessage: string | null;
}

export const initialState: State = {
  facility: null,
  errorMessage: null
};

export function reducer(state = initialState, action: ALL): State {
  switch (action.type) {
    case FacilityActionTypes.ADD_FACILITY: {
      return {
        ...state,
        errorMessage: null
      };
    }
    case FacilityActionTypes.ADD_FACILITY_SUCCESS:
      return {
        ...state,
        facility: action.payload, 
        errorMessage: null
      };
    case FacilityActionTypes.ADD_FACILITY_FAILURE: {
      return {
        ...state,
        errorMessage: action.payload.error.error.message
        ? action.payload.error.error.message
        : action.payload.error.message
      };
    }
    default:
      return state;
  }
}
