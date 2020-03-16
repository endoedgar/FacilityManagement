import { Actions, Effect, ofType } from "@ngrx/effects";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Observable } from "rxjs";
import { UIActionTypes, ShowMessage } from "../actions/ui.actions";
import { tap } from "rxjs/operators";
import { Injectable } from '@angular/core';

@Injectable()
export class UIEffects {
  constructor(private actions: Actions, private snackbar: MatSnackBar) {}

  @Effect({ dispatch: false })
  showMessage$: Observable<any> = this.actions.pipe(
    ofType(UIActionTypes.SHOW_MESSAGE),
    tap((action: ShowMessage) => {
      this.snackbar.open(action.message, "Okay", {
        duration: 5000
      });
    })
  );
}
