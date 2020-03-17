import { createAction, props } from "@ngrx/store";
import { FacilityRedux } from "src/app/models/FacilityRedux";
import { Update } from '@ngrx/entity';
import { MapModeEnum } from '../states/facility-redux.state';

export const addFacility = createAction(
  "[FACILITY-REDUX] AddFacility",
  props<{
    facility: {
      name: string;
      type: string;
      location: number[];
    };
  }>()
);

export const addFacilitySuccess = createAction(
  "[FACILITY-REDUX] AddFacility Success",
  props<{ facility: FacilityRedux, message: string }>()
);

export const addFacilityFailure = createAction(
  "[FACILITY-REDUX] AddFacility Failure",
  props<{ err: any }>()
);

export const updateFacility = createAction(
  "[FACILITY-REDUX] UpdateFacility",
  props<{
    facility: {
      _id: string;
      name: string;
      type: string;
      location: number[];
    };
  }>()
);

export const updateFacilitySuccess = createAction(
  "[FACILITY-REDUX] UpdateFacility Success",
  props<{ facility: Update<FacilityRedux>, message: string }>()
);

export const updateFacilityFailure = createAction(
  "[FACILITY-REDUX] UpdateFacility Failure",
  props<{ err: any }>()
);

export const DeleteFacility = createAction(
  "[FACILITY-REDUX] DeleteFacility",
  props<{ facility: FacilityRedux }>()
);

export const DeleteFacilitySuccess = createAction(
  "[FACILITY-REDUX] DeleteFacility Success",
  props<{ facility: FacilityRedux }>()
);

export const DeleteFacilityFailure = createAction(
  "[FACILITY-REDUX] DeleteFacility Failure",
  props<{ err: any }>()
);

export const GetFacilities = createAction("[FACILITY-REDUX] GetFacilities");

export const GetFacilitiesSuccess = createAction(
  "[FACILITY-REDUX] GetFacilities Success",
  props<{ facilities: FacilityRedux[] }>()
);

export const GetFacilitiesFailure = createAction(
  "[FACILITY-REDUX] GetFacilities Failure",
  props<{ err: any }>()
);

export const SelectFacility = createAction(
  "[FACILITY-REDUX] Select Facility",
  props<{ facility: FacilityRedux }>()
);

export const DeselectFacility = createAction(
  "[FACILITY-REDUX] Deselect Facility"
);

export const ChangeMode = createAction(
  "[FACILITY-REDUX] Change Facility Map Mode",
  props<{ mode: MapModeEnum }>()
);

export const AddNewFacilityObjectOnMap = createAction(
  "[FACILITY-REDUX] Add New Facility Object On Map",
  props<{ facility : FacilityRedux }>()
)

export const RemoveNewFacilityObjectOnMap = createAction(
  "[FACILITY-REDUX] Remove New Facility Object On Map",
  props<{ _id : string }>()
)

export const FacilityReduxActionTypes = {
  addFacility,
  addFacilitySuccess,
  addFacilityFailure,

  updateFacility,
  updateFacilitySuccess,
  updateFacilityFailure,

  DeleteFacility,
  DeleteFacilitySuccess,
  DeleteFacilityFailure,

  GetFacilities,
  GetFacilitiesSuccess,
  GetFacilitiesFailure,

  DeselectFacility,
  SelectFacility,

  AddNewFacilityObjectOnMap,
  RemoveNewFacilityObjectOnMap
};
