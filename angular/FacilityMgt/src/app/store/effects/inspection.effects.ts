import { Injectable } from "@angular/core";
import { Actions, Effect, ofType, createEffect } from "@ngrx/effects";
import { map, switchMap, catchError } from "rxjs/operators";

import { InspectionService } from "../../services/inspection.service";
import { Observable, of } from "rxjs";
import { InspectionActionTypes, getInspectionsSuccess, getInspectionsFailure, getInspectionSuccess, getInspectionFailure, getInspection, getFacilityInspections, getFacilityInspectionsSuccess, getFacilityInspectionsFailure } from "../actions/inspection.actions";
import { Inspection } from 'src/app/models/Inspection';

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
                console.dir("effect inspectionId", inspectionId);
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
                console.dir("effect facilityId", facilityId);
                return this.inspectionService.getFacilityInspections(facilityId).pipe(
                    map(response => response.data),
                    map((inspections: Inspection[]) => getFacilityInspectionsSuccess({ inspections })),
                    catchError(error => of(getFacilityInspectionsFailure({ error })))
                );
            })
        );
    });


}
