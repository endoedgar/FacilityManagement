import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { map, switchMap, catchError, filter } from "rxjs/operators";

import { InspectionService } from "../../services/inspection.service";
import { of } from "rxjs";
import { InspectionActionTypes, getInspectionsSuccess, getInspectionsFailure, getInspectionSuccess, getInspectionFailure, getInspection, getFacilityInspections, getFacilityInspectionsSuccess, getFacilityInspectionsFailure, createInspection, createInspectionSuccess, updateInspection, createInspectionFailure, updateInspectionFailure, updateInspectionSuccess, deleteInspection, deleteInspectionSuccess, deleteInspectionFailure } from "../actions/inspection.actions";
import { Inspection } from 'src/app/models/Inspection';
import { FacilityRedux } from 'src/app/models/FacilityRedux';

@Injectable()
export class InspectionEffects {
    constructor(private actions: Actions,
        private inspectionService: InspectionService) { }

    getInspections$ = createEffect(() => {
        return this.actions.pipe(
            ofType(InspectionActionTypes.GET_INSPECTIONS),
            switchMap(data => {
                return this.inspectionService.getInspections().pipe(
                    map(response => response.data),
                    map((inspections: Inspection[]) => getInspectionsSuccess({ inspections })),
                    catchError(error => of(getInspectionsFailure({ error })))
                );
            })
        )
    });

    getInspection$ = createEffect(() => {
        return this.actions.pipe(
            ofType(getInspection),
            map(action => action.inspectionId),
            switchMap(inspectionId => {
                return this.inspectionService.getInspection(inspectionId).pipe(
                    map(response => response.data),
                    map((inspection: Inspection) => getInspectionSuccess({ inspection })),
                    catchError(error => of(getInspectionFailure({ error })))
                );
            })
        );
    });


    getFacilityInspections$ = createEffect(() => {
        return this.actions.pipe(
            ofType(getFacilityInspections),
            map(action => action.facilityId),
            switchMap(facilityId => {
                return this.inspectionService.getFacilityInspections(facilityId).pipe(
                    map(response => response.data),
                    map((inspections: Inspection[]) => getFacilityInspectionsSuccess({ inspections })),
                    catchError(error => of(getFacilityInspectionsFailure({ error })))
                );
            })
        );
    });

    createInspection$ = createEffect(() => {
        return this.actions.pipe(
            ofType(createInspection),
            map(action => action.inspection),
            switchMap((inspection: Inspection) => {
                console.dir("effect create inspection", inspection);
                return this.inspectionService.createInspection(inspection).pipe(
                    map((inspection: Inspection) => createInspectionSuccess({ inspection })),
                    catchError(error => of(createInspectionFailure({ error })))
                );
            })
        );
    });

    updateInspection$ = createEffect(() => {
        return this.actions.pipe(
            ofType(updateInspection),
            map(action => action.inspection),
            switchMap((inspection: Inspection) => {
                console.dir("effect update inspection", inspection);
                return this.inspectionService.updateInspection(inspection).pipe(
                    map(response => response.data),
                    map((inspection: Inspection) => {
                        let returnedInspection = { ...inspection };
                        if (inspection.facility instanceof FacilityRedux)
                            returnedInspection.facility = inspection.facility._id;
                        return returnedInspection;
                    }),
                    map((inspection: Inspection) => {
                        return updateInspectionSuccess({
                            inspection: {
                                id: inspection._id,
                                changes: {
                                    ...inspection,
                                    facility: inspection.facility
                                }
                            }
                        })
                    }),
                    catchError(error => of(updateInspectionFailure({ error })))
                );
            })
        );
    });


    deleteInspection$ = createEffect(() => {
        return this.actions.pipe(
            ofType(deleteInspection),
            map(action => action.inspection),
            switchMap((inspection: Inspection) => {
                console.dir("effect delete inspection", inspection);
                return this.inspectionService.deleteInspection(inspection._id).pipe(
                    map((response) => deleteInspectionSuccess({ inspection })),
                    catchError(error => of(deleteInspectionFailure({ error })))
                );
            })
        );
    });

}
