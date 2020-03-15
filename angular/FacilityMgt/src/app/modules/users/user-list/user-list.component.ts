import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { User } from "src/app/models/User";
import { Observable } from "rxjs";
import { AppState, selectUsersState } from "src/app/store/app.states";
import { LoadUsers, ClearErrorMessage } from "src/app/store/actions/users.actions";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.scss"]
})
export class UserListComponent implements OnInit {
  users: User[] = null;
  getState: Observable<any>;
  displayedColumns: string[] = ['username', 'name', 'admin', 'id'];

  constructor(private store: Store<AppState>, private _snackBar: MatSnackBar) {
    this.getState = this.store.select(selectUsersState);
  }

  ngOnInit() {
    this.store.dispatch(new LoadUsers);
    this.getState.subscribe(state => {
      if (state.errorMessage) {
        this._snackBar.open(state.errorMessage, "Okay", {
          duration: 5000
        });
        this.store.dispatch(new ClearErrorMessage);
      }
      this.users = state.users;
    });
  }

  
}
