import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { map, switchMap, catchError, tap, mapTo } from "rxjs/operators";

import { UsersService } from "../../services/users.service";
import { Observable, of } from "rxjs";
import {
  AuthActionTypes,
  LoadUsersSuccess,
  LoadUsersFailure
} from "../actions/users.actions";
import { User } from 'src/app/models/User';

@Injectable()
export class UsersEffects {
  constructor(
    private actions: Actions,
    private usersService: UsersService
  ) {}

  @Effect()
  Load: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOAD_USERS),
    //map((action: LoadUsers) => action.payload),
    switchMap(_ => {
      return this.usersService.find().pipe(
        map((users : User[]) => {
          return new LoadUsersSuccess( users );
        }),
        catchError(error => {
          return of(new LoadUsersFailure({ error }));
        })
      );
    })
  );
}
