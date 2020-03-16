import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { User } from "src/app/models/User";
import { AppState } from "src/app/store/states/app.state";
import { SignUp, ClearErrorMessage } from "src/app/store/actions/auth.actions";
import { MatSnackBar } from "@angular/material/snack-bar";
import { selectAuthState, selectAuthError, selectAuthLoading } from "src/app/store/selectors/auth.selectors";

@Component({
  selector: "app-signup-login",
  templateUrl: "./user-signup.component.html",
  styleUrls: ["./user-signup.component.scss"]
})
export class UserSignupComponent implements OnInit {
  user: User = new User();
  error$ = this.store.select(selectAuthError);
  loading$ = this.store.select(selectAuthLoading);

  constructor(private store: Store<AppState>, private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.error$.subscribe(error => {
      if (error) {
        this._snackBar.open(error.error.message || error.message, "Okay", {
          duration: 5000
        });
      }
      this.store.dispatch(new ClearErrorMessage);
    });
  }

  onSubmit(): void {
    const payload = {
      name: this.user.name,
      username: this.user.username,
      password: this.user.password
    };
    this.store.dispatch(new SignUp(payload));
  }
}
