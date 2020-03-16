import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/store/states/app.state";
import { LoadUser } from "src/app/store/actions/users.actions";
import {
  getCurrentUser,
  selectUsersLoading
} from "src/app/store/selectors/users.selectors";
import { ActivatedRoute, ParamMap } from "@angular/router";

@Component({
  selector: "app-user-detail",
  templateUrl: "./user-detail.component.html",
  styleUrls: ["./user-detail.component.scss"]
})
export class UserDetailComponent implements OnInit {
  user$ = this.store.select(getCurrentUser);
  loading$ = this.store.select(selectUsersLoading);

  constructor(private store: Store<AppState>, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) =>
      this.store.dispatch(LoadUser({ username: params.get("username") }))
    );
  }
}
