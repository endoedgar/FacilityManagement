import { createReducer, on } from "@ngrx/store";

import {
  addFacility,
  addFacilitySuccess,
  addFacilityFailure,
  DeleteFacilityFailure,
  GetFacilities,
  GetFacilitiesFailure,
  DeleteFacility,
  DeleteFacilitySuccess,
  GetFacilitiesSuccess,
  SelectFacility,
  ChangeMode,
  AddNewFacilityObjectOnMap,
  updateFacilityFailure,
  updateFacilitySuccess,
  RemoveNewFacilityObjectOnMap,
  DeselectFacility
} from "../actions/facility-redux.actions";
import {
  initialFacilityState,
  facilityAdapter,
  MapModeEnum
} from "../states/facility-redux.state";

export const reducer = createReducer(
  initialFacilityState,
  on(addFacility, (state, action) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(addFacilitySuccess, (state, action) =>
    facilityAdapter.addOne(action.facility, {
      ...state,
      error: null,
      loading: false,
      mapMode: MapModeEnum.NONE
    })
  ),
  on(updateFacilitySuccess, (state, action) =>
    facilityAdapter.updateOne(action.facility, {
      ...state,
      error: null,
      loading: false
    })
  ),
  on(
    addFacilityFailure,
    DeleteFacilityFailure,
    GetFacilitiesFailure,
    updateFacilityFailure,
    (state, action) => ({
      ...state,
      error: action.err,
      loading: false
    })
  ),
  on(DeleteFacility, (state, action) => ({
    ...state,
    error: null,
    loading: true,
    mapMode: MapModeEnum.NONE
  })),
  on(DeleteFacilitySuccess, (state, action) =>
    facilityAdapter.removeOne(action.facility._id, {
      ...state,
      error: null,
      loading: false
    })
    
  ),
  on(GetFacilities, (state, action) => ({
    ...state,
    error: null,
    loading: true,
    selectedFacilityId: null,
    mapMode: MapModeEnum.NONE
  })),
  on(GetFacilitiesSuccess, (state, action) =>
    facilityAdapter.setAll(action.facilities, {
      ...state,
      error: null,
      loading: false
    })
  ),
  on(SelectFacility, (state, action) => ({
    ...state,
    selectedFacilityId: action.facility._id,
    mapMode: MapModeEnum.SELECT_FACILITY
  })),
  on(DeselectFacility, (state, action) => ({
    ...state,
    selectedFacilityId: null
  })),
  on(ChangeMode, (state, action) => ({ ...state, mapMode: action.mode })),
  on(AddNewFacilityObjectOnMap, (state, action) =>
    facilityAdapter.upsertOne(action.facility, {
      ...state,
      selectedFacilityId: action.facility._id
    })
  ),
  on(RemoveNewFacilityObjectOnMap, (state, action) =>
    facilityAdapter.removeOne(action._id, {
      ...state,
      selectedFacilityId: null
    })
  )
);
