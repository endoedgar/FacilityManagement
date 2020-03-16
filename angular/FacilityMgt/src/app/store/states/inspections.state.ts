import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { Inspection } from 'src/app/models/Inspection';

export interface InspectionsState extends EntityState<Inspection> {
  loading: boolean;
  error: any;
  selectedInspectionId: string;
}

export const inspectionsAdapter: EntityAdapter<Inspection> = createEntityAdapter<Inspection>({
  selectId: instance => instance._id
});

export const initialInspectionsState: InspectionsState = inspectionsAdapter.getInitialState({
  loading: false,
  error: null,
  selectedInspectionId: null
});
