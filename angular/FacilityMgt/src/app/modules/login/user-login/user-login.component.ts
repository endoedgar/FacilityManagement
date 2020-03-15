import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { User } from "src/app/models/User";
import { Observable } from "rxjs";
import { AppState } from "src/app/store/states/app.state";
import { LogIn, ClearErrorMessage } from "src/app/store/actions/auth.actions";
import { MatSnackBar } from "@angular/material/snack-bar";
import { selectAuthState } from "src/app/store/selectors/auth.selectors";

@Component({
  selector: "app-user-login",
  templateUrl: "./user-login.component.html",
  styleUrls: ["./user-login.component.scss"]
})
export class UserLoginComponent implements OnInit {
  user: User = new User();
  getState: Observable<any>;

  constructor(private store: Store<AppState>, private _snackBar: MatSnackBar) {
    this.getState = this.store.select(selectAuthState);
  }

  ngOnInit() {
    this.getState.subscribe(state => {
      if (state.errorMessage) {
        this._snackBar.open(state.errorMessage, "Okay", {
          duration: 5000
        });
        this.store.dispatch(new ClearErrorMessage());
      }
    });
  }

  onSubmit(): void {
    const payload = {
      username: this.user.username,
      password: this.user.password
    };
    this.store.dispatch(new LogIn(payload));
  }
}
