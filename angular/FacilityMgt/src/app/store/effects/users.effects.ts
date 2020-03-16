import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { map, switchMap, catchError } from "rxjs/operators";

import { UsersService } from "../../services/users.service";
import { Observable, of } from "rxjs";
import {
  UserActionTypes,
  LoadUsersSuccess,
  LoadUsersFailure
} from "../actions/users.actions";
import { User } from "src/app/models/User";
import { ShowMessage } from "../actions/ui.actions";

@Injectable()
export class UsersEffects {
  constructor(private actions: Actions, private usersService: UsersService) {}

  @Effect()
  Load: Observable<any> = this.actions.pipe(
    ofType(UserActionTypes.LOAD_USERS),
    switchMap(_ => {
      return this.usersService.find().pipe(
        map((users: User[]) => {
          return new LoadUsersSuccess(users);
        }),
        catchError(error => {
          return of(new LoadUsersFailure(error));
        })
      );
    })
  );

  @Effect()
  showMessageOnFailures$: Observable<any> = this.actions.pipe(
    ofType(UserActionTypes.LOAD_USERS_FAILURE),
    map((action: LoadUsersFailure) => action.err),
    switchMap(err => {
      return of(new ShowMessage(err.error.message || err.message));
    })
  );
}
