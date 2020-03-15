import { Facility } from "src/app/models/Facility";

export interface FacilityState {
  facility: Facility | null;
  errorMessage: string | null;
}

export const initialFacilityState: FacilityState = {
  facility: null,
  errorMessage: null
};
