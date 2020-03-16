import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { Inspection } from "src/app/models/Inspection";

export interface InspectionState extends EntityState<Inspection> {
  selectedInspectionId: string;
  errorMessage: String | undefined;
  loading: Boolean;
}

export const inspectionAdapter: EntityAdapter<Inspection> = createEntityAdapter<Inspection>({
  selectId: instance => instance._id
});


export const successAdapter: EntityAdapter<Object> = createEntityAdapter<Object>({

});


export const initialInspectionsState: InspectionState = inspectionAdapter.getInitialState({
  selectedInspectionId: null,
  errorMessage: undefined,
  loading: false
});
