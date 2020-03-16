import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { User } from "src/app/models/User";
import { AppState } from "src/app/store/states/app.state";
import { SignUp } from "src/app/store/actions/auth.actions";
import { selectAuthLoading } from "src/app/store/selectors/auth.selectors";

@Component({
  selector: "app-signup-login",
  templateUrl: "./user-signup.component.html",
  styleUrls: ["./user-signup.component.scss"]
})
export class UserSignupComponent implements OnInit {
  user: User = new User();
  loading$ = this.store.select(selectAuthLoading);

  constructor(private store: Store<AppState>) { }

  ngOnInit() {}

  onSubmit(): void {
    const payload = {
      name: this.user.name,
      username: this.user.username,
      password: this.user.password,
      email: this.user.email
    };
    this.store.dispatch(new SignUp(payload));
  }
}
