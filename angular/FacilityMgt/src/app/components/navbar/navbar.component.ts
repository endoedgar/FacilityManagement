import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/store/states/app.states";
import { Observable } from "rxjs";
import { LogOut } from "src/app/store/actions/auth.actions";
import { selectAuthState } from "src/app/store/selectors/auth.selectors";

@Component({
  selector: "navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit {
  getState: Observable<any>;
  isAuthenticated: any;
  user: any;

  constructor(private store: Store<AppState>) {
    this.getState = this.store.select(selectAuthState);
  }

  ngOnInit(): void {
    this.getState.subscribe(state => {
      if (state) {
        this.isAuthenticated = state.isAuthenticated;
        this.user = { ...state.user };
      }
    });
  }

  onLogout(): void {
    this.store.dispatch(new LogOut());
  }
}
