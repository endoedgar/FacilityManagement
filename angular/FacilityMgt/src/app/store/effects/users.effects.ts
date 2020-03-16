import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { map, switchMap, catchError } from "rxjs/operators";

import { UsersService } from "../../services/users.service";
import { Observable, of } from "rxjs";
import {
  UserActionTypes,
  LoadUsersSuccess,
  LoadUsersFailure,
  LoadUserFailure,
  LoadUser,
  LoadUserSuccess
} from "../actions/users.actions";
import { User } from "src/app/models/User";
import { ShowMessage } from "../actions/ui.actions";

@Injectable()
export class UsersEffects {
  constructor(private actions: Actions, private usersService: UsersService) {}

  @Effect()
  loadUsers$: Observable<any> = this.actions.pipe(
    ofType(UserActionTypes.LOAD_USERS),
    switchMap(_ => {
      return this.usersService.find().pipe(
        map((users: User[]) => new LoadUsersSuccess(users)),
        catchError(error => of(new LoadUsersFailure(error)))
      );
    })
  );

  @Effect()
  loadUser$: Observable<any> = this.actions.pipe(
    ofType(UserActionTypes.LOAD_USER),
    map((action:LoadUser) => action.username),
    switchMap(username => {
      return this.usersService.findOne(username).pipe(
        map((user: User) => new LoadUserSuccess(user)),
        catchError(error => of(new LoadUserFailure(error)))
      );
    })
  );

  @Effect()
  showMessageOnFailures$: Observable<any> = this.actions.pipe(
    ofType(UserActionTypes.LOAD_USERS_FAILURE, UserActionTypes.LOAD_USER_FAILURE),
    map((action: LoadUsersFailure | LoadUserFailure) => action.err),
    switchMap(err => {
      return of(new ShowMessage(err.error.message || err.message));
    })
  );
}
