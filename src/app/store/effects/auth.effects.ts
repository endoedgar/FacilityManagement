import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { map, switchMap, catchError, tap } from "rxjs/operators";

import { AuthService } from "../../services/auth.service";
import { Observable, of } from "rxjs";
import {
  AuthActionTypes,
  LogIn,
  LogInSuccess,
  LogInFailure,
  SignUp,
  SignUpSuccess,
  SignUpFailure,
  LoadToken,
  ReloadToken,
  UpdateProfileFailure,
  UpdateProfileSuccess,
  UpdateProfile
} from "../actions/auth.actions";
import { ShowMessage } from "../actions/ui.actions";

@Injectable()
export class AuthEffects {
  constructor(
    private actions: Actions,
    private authService: AuthService,
    private router: Router
  ) {}

  @Effect()
  LogIn$: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LogIn),
    switchMap(payload =>
      this.authService.logIn(payload.username, payload.password).pipe(
        map(user => LogInSuccess({ accessToken: user.accessToken })),
        catchError(err => of(LogInFailure({err})))
      )
    )
  );

  @Effect({ dispatch: false })
  LogInSuccess$: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LogInSuccess),
    tap((action) => {
      this.authService.setToken(action.accessToken);
      this.router.navigateByUrl("/");
    })
  );

  @Effect()
  SignUp$: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.SignUp),
    switchMap(user =>
      this.authService.signUp(user.name, user.username, user.password, user.email).pipe(
        map(
          response =>
            SignUpSuccess({
              accessToken: response.accessToken
            })
        ),
        catchError(err => of(SignUpFailure({err})))
      )
    )
  );

  @Effect({ dispatch: false })
  SignUpSuccess$: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.SignUpSuccess),
    tap((response) => {
      this.authService.setToken(response.accessToken);
      this.router.navigateByUrl("/");
    })
  );

  @Effect()
  UpdateProfile$: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.UpdateProfile),
    map((action) => action.user),
    switchMap(user =>
      this.authService.patch(user.username, user).pipe(
        map(
          response =>
            UpdateProfileSuccess({
              accessToken: response.accessToken
            })
        ),
        catchError(err => of(UpdateProfileFailure({err})))
      )
    )
  );

  @Effect({ dispatch: false })
  UpdateProfileSuccess$: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.UpdateProfileSuccess),
    tap((response) => {
      this.authService.setToken(response.accessToken);
      this.router.navigateByUrl("/");
    })
  );

  @Effect()
  showMessageOnFailures$: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.SignUpFailure, AuthActionTypes.LogInFailure, AuthActionTypes.UpdateProfileFailure),
    map((action) => action.err),
    switchMap(err => of(ShowMessage({message: err.error.message || err.message})))
  );

  @Effect({ dispatch: false })
  LogOut$: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LogOut),
    tap(_ => {
      this.authService.setToken(null);
      this.router.navigateByUrl("/");
    })
  );

  @Effect({ dispatch: true })
  ReloadToken$: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.ReloadToken),
    switchMap(_ => {
      const token = this.authService.getToken();
      return of(
        LoadToken({payload: {
          accessToken: token,
          userData: this.authService.getUserDataFromJWT(token)
        }})
      );
    })
  );

  @Effect({ dispatch: true })
  TriggerReloadToken$: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LogInSuccess, AuthActionTypes.SignUpSuccess, AuthActionTypes.UpdateProfileSuccess),
    switchMap(_ => of(ReloadToken()))
  );
}
