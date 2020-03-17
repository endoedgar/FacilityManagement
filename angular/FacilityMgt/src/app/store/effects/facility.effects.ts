import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { map, switchMap, catchError, tap } from "rxjs/operators";

import { FacilityService } from "../../services/facility.service";
import { Observable, of } from "rxjs";
import {
  FacilityActionTypes,
  addFacility,
  addFacilitySuccess,
  addFacilityFailure,
  DeleteFacility,
  DeleteFacilitySuccess,
  DeleteFacilityFailure,
  GetFacilities,
  GetFacilitiesSuccess,
  GetFacilitiesFailure
} from "../actions/facility.actions";
import { ShowMessage } from '../actions/ui.actions';

@Injectable()
export class FacilityEffects {
  constructor(
    private actions: Actions,
    private facilityService: FacilityService
  ) {}

  @Effect()
  addFacility: Observable<any> = this.actions.pipe(
    ofType(FacilityActionTypes.ADD_FACILITY),
    map((action: addFacility) => action.payload),
    switchMap(payload => {
        return this.facilityService.addFacility(payload.name, payload.type,payload.location).pipe(
        map(facility => {
          return new addFacilitySuccess({'addFacility':facility});
        }),
        catchError(err => {
          return of(new addFacilityFailure({ err }));
        })
      );
    })
  );

  @Effect()
  GetFacilities: Observable<any> = this.actions.pipe(
    ofType(FacilityActionTypes.GET_FACILITIES),
    switchMap(_ => {
        return this.facilityService.getFacilities().pipe(
        map(facility => {
          return new GetFacilitiesSuccess({'getFacilities':facility});
        }),
        catchError(err => {
          return of(new GetFacilitiesFailure({ err }));
        })
      );
    })
  );

  @Effect()
  DeleteFacility: Observable<any> = this.actions.pipe(
    ofType(FacilityActionTypes.DELETE_FACILITY),
    map((action: DeleteFacility) => action.payload),
    switchMap(payload => {
        return this.facilityService.deleteFacility(payload.id).pipe(
        map(facility => {
          return new DeleteFacilitySuccess({'deleteFacility':facility});
        }),
        catchError(err => {
          return of(new DeleteFacilityFailure({ err }));
        })
      );
    })
  );

  @Effect()
  showMessageOnFailures$: Observable<any> = this.actions.pipe(
    ofType(FacilityActionTypes.DELETE_FACILITY_FAILURE,
      FacilityActionTypes.ADD_FACILITY_FAILURE,
      FacilityActionTypes.GET_FACILITIES_FAILURE),
    map((action : DeleteFacilityFailure | addFacilityFailure | GetFacilitiesFailure) => action.payload.err),
    switchMap(err => of(ShowMessage({message: err.error.message || err.message})))
  );
}
