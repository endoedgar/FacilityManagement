import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { map, switchMap, catchError } from "rxjs/operators";

import { UsersService } from "../../services/users.service";
import { Observable, of } from "rxjs";
import {
  LoadUsersSuccess,
  LoadUsersFailure,
  LoadUserFailure,
  LoadUser,
  LoadUserSuccess,
  LoadUsers
} from "../actions/users.actions";
import { User } from "src/app/models/User";
import { ShowMessage } from "../actions/ui.actions";

@Injectable()
export class UsersEffects {
  constructor(private actions: Actions, private usersService: UsersService) {}

  @Effect()
  loadUsers$: Observable<any> = this.actions.pipe(
    ofType(LoadUsers),
    switchMap(_ => {
      return this.usersService.find().pipe(
        map((users: User[]) => LoadUsersSuccess({users})),
        catchError(err => of(LoadUsersFailure({err})))
      );
    })
  );

  @Effect()
  loadUser$: Observable<any> = this.actions.pipe(
    ofType(LoadUser),
    map((action) => action.username),
    switchMap(username => {
      return this.usersService.findOne(username).pipe(
        map((user: User) => LoadUserSuccess({user})),
        catchError(err => of(LoadUserFailure({err})))
      );
    })
  );

  @Effect()
  showMessageOnFailures$: Observable<any> = this.actions.pipe(
    ofType(LoadUsersFailure, LoadUserFailure),
    map((action) => action.err),
    switchMap(err => {
      return of(ShowMessage({message: err.error.message || err.message}));
    })
  );
}
