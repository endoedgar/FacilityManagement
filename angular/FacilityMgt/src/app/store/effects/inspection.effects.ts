import { Injectable } from "@angular/core";
import { Actions, Effect, ofType, createEffect } from "@ngrx/effects";
import { map, switchMap, catchError } from "rxjs/operators";

import { InspectionService } from "../../services/inspection.service";
import { Observable, of } from "rxjs";
import { InspectionActionTypes, getInspectionsSuccess, getInspectionsFailure, getInspectionSuccess, getInspectionFailure } from "../actions/inspection.actions";
import { Inspection } from 'src/app/models/Inspection';

@Injectable()
export class InspectionEffects {
    constructor(private actions: Actions,
        private inspectionService: InspectionService) { }

    getInspections$ = createEffect(() => {
        return this.actions.pipe(
            ofType(InspectionActionTypes.GET_INSPECTIONS),
            switchMap(data => {
                console.dir("my data", data);
                return this.inspectionService.getInspections().pipe(
                    map(response => response.data),
                    map((inspections: Inspection[]) => getInspectionsSuccess({ inspections })),
                    catchError(error => of(getInspectionsFailure({ error })))
                );
            })
        )
    });

    // getInspection$ = createEffect(() => {
    //     return this.actions.pipe(
    //         ofType(InspectionActionTypes.GET_INSPECTION),
    //         switchMap(data => {
    //             console.dir("my data", data);
    //             return this.inspectionService.getInspection("").pipe(
    //                 map(response => response.data),
    //                 map((inspection: Inspection) => getInspectionSuccess({ inspection })),
    //                 catchError(error => of(getInspectionFailure({ error })))
    //             );
    //         })
    //     )
    // });
}
