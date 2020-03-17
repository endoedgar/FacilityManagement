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
        errorMessage: action.payload.err.error.message
        ? action.payload.err.error.message
        : action.payload.err.message
      };
    }
    case FacilityActionTypes.DELETE_FACILITY: {
      return {
        ...state,
        errorMessage: null
      };
    }
    case FacilityActionTypes.DELETE_FACILITY_SUCCESS:
      return {
        ...state,
        errorMessage: null
      };
    case FacilityActionTypes.DELETE_FACILITY_FAILURE: {
      return {
        ...state,
        errorMessage: action.payload.err.error.message
        ? action.payload.err.error.message
        : action.payload.err.message
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
        errorMessage: action.payload.err.error.message
        ? action.payload.err.error.message
        : action.payload.err.message
      };
    }
    default:
      return state;
  }
}
