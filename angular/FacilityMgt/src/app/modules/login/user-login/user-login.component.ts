import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { User } from "src/app/models/User";
import { AppState } from "src/app/store/states/app.state";
import { LogIn, ClearErrorMessage } from "src/app/store/actions/auth.actions";
import { MatSnackBar } from "@angular/material/snack-bar";
import { selectAuthError } from "src/app/store/selectors/auth.selectors";

@Component({
  selector: "app-user-login",
  templateUrl: "./user-login.component.html",
  styleUrls: ["./user-login.component.scss"]
})
export class UserLoginComponent implements OnInit {
  user: User = new User();
  error$ = this.store.select(selectAuthError);

  constructor(private store: Store<AppState>, private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.error$.subscribe(error => {
      if (error) {
        this._snackBar.open(error, "Okay", {
          duration: 5000
        });
      }
      this.store.dispatch(new ClearErrorMessage);
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
