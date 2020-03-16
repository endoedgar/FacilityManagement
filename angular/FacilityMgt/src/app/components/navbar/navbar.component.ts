import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/store/states/app.state";
import { LogOut } from "src/app/store/actions/auth.actions";
import { selectLoggedinUser } from "src/app/store/selectors/auth.selectors";

@Component({
  selector: "navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit {
  loggedInUser$ = this.store.select(selectLoggedinUser);

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {}

  onLogout(): void {
    this.store.dispatch(LogOut());
  }
}
