import { Component, OnInit } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { User } from "src/app/models/User";
import { Observable } from "rxjs";
import { AppState } from "src/app/store/states/app.states";
import { LoadUsers, ClearErrorMessage } from "src/app/store/actions/users.actions";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatTableDataSource } from '@angular/material/table';
import { selectUsersState, selectAllUsers } from 'src/app/store/selectors/users.selectors';

@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.scss"]
})
export class UserListComponent implements OnInit {
  users: User[] = null;
  getState: Observable<any>;
  dataSource: MatTableDataSource<User>;
  displayedColumns: string[] = ['username', 'name', 'admin', 'id'];

  constructor(private store: Store<AppState>, private _snackBar: MatSnackBar) {
    this.getState = this.store.select(selectUsersState);
  }

  ngOnInit() {
    this.store.dispatch(new LoadUsers);

    this.store.pipe(select(selectAllUsers)).subscribe(users => {
      this.dataSource = new MatTableDataSource(users);
    })

    this.getState.subscribe(state => {
      if (state.errorMessage) {
        this._snackBar.open(state.errorMessage, "Okay", {
          duration: 5000
        });
        this.store.dispatch(new ClearErrorMessage);
      }
      
    });
  }

  
}