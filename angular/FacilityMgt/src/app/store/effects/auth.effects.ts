import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { map, switchMap, catchError, tap, mapTo } from "rxjs/operators";

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
} from "../actions/auth.actions";

@Injectable()
export class AuthEffects {
  constructor(
    private actions: Actions,
    private authService: AuthService,
    private router: Router
  ) {}

  @Effect()
  LogIn: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN),
    map((action: LogIn) => action.payload),
    switchMap(payload => {
      return this.authService.logIn(payload.username, payload.password).pipe(
        map(user => {
          return new LogInSuccess({ token: user.accessToken });
        }),
        catchError(error => {
          return of(new LogInFailure({ error }));
        })
      );
    })
  );

  @Effect({ dispatch: false })
  LogInSuccess: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_SUCCESS),
    tap(user => {
      this.authService.setToken(user.payload.token);
      this.router.navigateByUrl("/");
    })
  );

  @Effect({ dispatch: false })
  LogInFailure: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_FAILURE)
  );

  @Effect()
  SignUp: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.SIGNUP),
    map((action: SignUp) => action.payload),
    switchMap(payload => {
      return this.authService
        .signUp(payload.name, payload.username, payload.password)
        .pipe(
          map(user => {
            return new SignUpSuccess({
              token: user.accessToken
            });
          }),
          catchError(error => {
            return of(new SignUpFailure({ error }));
          })
        );
    })
  );

  @Effect({ dispatch: false })
  SignUpSuccess: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.SIGNUP_SUCCESS),
    tap(user => {
      this.authService.setToken(user.payload.token);
      this.router.navigateByUrl("/");
    })
  );

  @Effect({ dispatch: false })
  SignUpFailure: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.SIGNUP_FAILURE)
  );

  @Effect({ dispatch: false })
  LogOut: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGOUT),
    tap(_ => {
      this.authService.setToken(null);
      this.router.navigateByUrl("/");
    })
  )

  @Effect({ dispatch: true })
  ReloadToken: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.RELOAD_TOKEN),
    switchMap(_ => {
      return of(new LoadToken({token: this.authService.getToken()}))
    })
  );

  @Effect({ dispatch: true })
  TriggerReloadToken: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_SUCCESS, AuthActionTypes.SIGNUP_SUCCESS),
    switchMap(_ => {
      return of(new ReloadToken())
    })
  );
}
