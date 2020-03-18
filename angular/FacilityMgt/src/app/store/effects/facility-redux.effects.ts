import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import {
  map,
  switchMap,
  catchError,
  tap,
  concatMapTo,
  mergeMap,
  filter,
  pairwise
} from "rxjs/operators";

import { FacilityService } from "../../services/facility.service";
import { Observable, of, merge } from "rxjs";
import {
  addFacility,
  addFacilitySuccess,
  addFacilityFailure,
  DeleteFacility,
  DeleteFacilitySuccess,
  DeleteFacilityFailure,
  GetFacilities,
  GetFacilitiesSuccess,
  GetFacilitiesFailure,
  AddNewFacilityObjectOnMap,
  SelectFacility,
  updateFacilityFailure,
  updateFacilitySuccess,
  updateFacility,
  RemoveNewFacilityObjectOnMap,
  ChangeMode,
  DeselectFacility
} from "../actions/facility-redux.actions";
import { ShowMessage } from "../actions/ui.actions";
import { FacilityRedux } from "src/app/models/FacilityRedux";
import { MapModeEnum } from '../states/facility-redux.state';

@Injectable()
export class FacilityReduxEffects {
  constructor(
    private actions: Actions,
    private facilityService: FacilityService
  ) {}

  @Effect()
  addFacility: Observable<any> = this.actions.pipe(
    ofType(addFacility),
    map(action => action.facility),
    switchMap(facility => {
      return this.facilityService
        .addFacility(facility.name, facility.type, facility.location)
        .pipe(
          mergeMap((response: { data: FacilityRedux; message: string }) => [
            addFacilitySuccess({
              facility: response.data,
              message: response.message
            }),
            RemoveNewFacilityObjectOnMap({ _id: "NEW_FACILITY" })
          ]),
          catchError(err => {
            return of(addFacilityFailure({ err }));
          })
        );
    })
  );

  @Effect()
  updateFacility: Observable<any> = this.actions.pipe(
    ofType(updateFacility),
    map(action => action.facility),
    switchMap(facility => {
      return this.facilityService
        .updateFacility(
          facility._id,
          facility.name,
          facility.type,
          facility.location
        )
        .pipe(
          mergeMap((response: { data: FacilityRedux; message: string }) => [
            updateFacilitySuccess({
              facility: {
                id: facility._id,
                changes: {
                  location: facility.location,
                  name: facility.name,
                  type: facility.type
                }
              },
              message: response.message
            }),
            ChangeMode({mode:MapModeEnum.SELECT_FACILITY})
          ]
          ),
          catchError(err => {
            return of(updateFacilityFailure({ err }));
          })
        );
    })
  );

  @Effect()
  GetFacilities: Observable<any> = this.actions.pipe(
    ofType(GetFacilities),
    switchMap(_ => {
      return this.facilityService.getFacilities().pipe(
        map(response => response.data),
        map(facilities => {
          return GetFacilitiesSuccess({ facilities });
        }),
        catchError(err => {
          return of(GetFacilitiesFailure({ err }));
        })
      );
    })
  );

  @Effect()
  DeleteFacility: Observable<any> = this.actions.pipe(
    ofType(DeleteFacility),
    map(action => action.facility),
    switchMap(facility => {
      return this.facilityService.deleteFacility(facility._id).pipe(
        map(_ => {
          console.log(_)
          return DeleteFacilitySuccess({ facility });
        }),
        catchError(err => {
          console.log(err)
          return of(DeleteFacilityFailure({ err }));
        })
      );
    })
  );

  @Effect()
  showMessageOnFailures$: Observable<any> = this.actions.pipe(
    ofType(
      DeleteFacilityFailure,
      addFacilityFailure,
      GetFacilitiesFailure,
      updateFacilityFailure
    ),
    map(action => action.err),
    switchMap(err =>
      of(ShowMessage({ message: err.error.message || err.message }))
    )
  );

  @Effect()
  showMessageOnSuccess$: Observable<any> = this.actions.pipe(
    ofType(addFacilitySuccess, updateFacilitySuccess),
    map(action => action.message),
    switchMap(message => of(ShowMessage({ message })))
  );

  @Effect()
  removeNewFacilityObjectOnAnyStateChange$: Observable<any> = this.actions.pipe(
    ofType(ChangeMode),
    map(action => action.mode),
    pairwise(),
    filter(([past, current]:MapModeEnum[]) => (past == MapModeEnum.CREATE_FACILITY && current != past)),
    switchMap(_ => of(RemoveNewFacilityObjectOnMap({ _id: "NEW_FACILITY" })))
  );

  @Effect()
  deselectFacilityIfModeIsNoneAutomaticaly$: Observable<any> = this.actions.pipe(
    ofType(ChangeMode),
    map(action => action.mode),
    filter(mode => mode == MapModeEnum.NONE),
    switchMap(_ => of(DeselectFacility()))
  );
}
