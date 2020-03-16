import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { map, switchMap, catchError } from "rxjs/operators";

import { InspectionsService } from "../../services/inspections.service";
import { Observable, of } from "rxjs";
import { ShowMessage } from "../actions/ui.actions";
import {
  LoadInspections,
  LoadInspectionsSuccess,
  LoadInspection,
  LoadInspectionSuccess,
  LoadInspectionFailure,
  LoadInspectionsFailure
} from "../actions/inspections.actions";
import { Inspection } from "src/app/models/Inspection";

@Injectable()
export class InspectionsEffects {
  constructor(
    private actions: Actions,
    private inspectionsService: InspectionsService
  ) {}

  @Effect()
  loadInspections$: Observable<any> = this.actions.pipe(
    ofType(LoadInspections),
    switchMap(_ => {
      return this.inspectionsService.find().pipe(
        map((inspections: Inspection[]) =>
          LoadInspectionsSuccess({ inspections })
        ),
        catchError(err => of(LoadInspectionsFailure({ err })))
      );
    })
  );

  @Effect()
  loadInspection$: Observable<any> = this.actions.pipe(
    ofType(LoadInspection),
    map(action => action.inspection_id),
    switchMap(inspection_id => {
      return this.inspectionsService.findOne(inspection_id).pipe(
        map((inspection: Inspection) => LoadInspectionSuccess({ inspection })),
        catchError(err => of(LoadInspectionFailure({ err })))
      );
    })
  );

  @Effect()
  showMessageOnFailures$: Observable<any> = this.actions.pipe(
    ofType(LoadInspectionsFailure, LoadInspectionFailure),
    map(action => action.err),
    switchMap(err => {
      return of(ShowMessage({ message: err.error.message || err.message }));
    })
  );
}
