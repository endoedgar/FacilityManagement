import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { User } from "src/app/models/User";
import { AppState } from "src/app/store/states/app.state";
import { LogIn } from "src/app/store/actions/auth.actions";
import { selectAuthLoading } from "src/app/store/selectors/auth.selectors";

@Component({
  selector: "app-user-login",
  templateUrl: "./user-login.component.html",
  styleUrls: ["./user-login.component.scss"]
})
export class UserLoginComponent implements OnInit {
  user: User = new User();
  loading$ = this.store.select(selectAuthLoading);

  constructor(private store: Store<AppState>) { }

  ngOnInit() { }

  onSubmit(): void {
    this.store.dispatch(new LogIn({
      username: this.user.username,
      password: this.user.password
    }));
  }
}
