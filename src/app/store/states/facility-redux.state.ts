import { FacilityRedux } from "src/app/models/FacilityRedux";
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

export enum MapModeEnum {
  NONE = "NONE",
  CREATE_FACILITY = "CREATE_FACILITY",
  SELECT_FACILITY = "SELECT_FACILITY",
  EDIT_FACILITY = "EDIT_FACILITY",
  DELETE_FACILITY = "DELETE_FACILITY"
};

export interface FacilityReduxState extends EntityState<FacilityRedux> {
  loading : boolean;
  error : any;
  selectedFacilityId : string;
  mapMode : MapModeEnum;
}

export const facilityAdapter: EntityAdapter<FacilityRedux> = createEntityAdapter<FacilityRedux>({
  selectId: instance => instance._id
});

export const initialFacilityState: FacilityReduxState = facilityAdapter.getInitialState({
  loading: false,
  error: null,
  selectedFacilityId: null,
  mapMode: MapModeEnum.NONE
});
