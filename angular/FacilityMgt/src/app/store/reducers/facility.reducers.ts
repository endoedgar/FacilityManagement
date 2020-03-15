import { ALL, FacilityActionTypes } from "../actions/facility.actions";
import { initialFacilityState, FacilityState } from '../states/facility.state';

export function reducer(state = initialFacilityState, action: ALL): FacilityState {
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
    case FacilityActionTypes.GET_FACILITIES: {
      return {
        ...state,
        errorMessage: null
      };
    }
    case FacilityActionTypes.GET_FACILITIES_SUCCESS:
      return {
        ...state,
        facility: action.payload, 
        errorMessage: null
      };
    case FacilityActionTypes.GET_FACILITIES_FAILURE: {
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
