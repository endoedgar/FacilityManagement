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
  GetFacilities,
  GetFacilitiesSuccess,
  GetFacilitiesFailure
} from "../actions/facility.actions";

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
        catchError(error => {
          return of(new addFacilityFailure({ error }));
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
        catchError(error => {
          return of(new GetFacilitiesFailure({ error }));
        })
      );
    })
  );
}
