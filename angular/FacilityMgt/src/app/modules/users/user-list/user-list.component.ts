import { Component, OnInit } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { User } from "src/app/models/User";
import { AppState } from "src/app/store/states/app.state";
import { LoadUsers } from "src/app/store/actions/users.actions";
import { MatTableDataSource } from "@angular/material/table";
import { selectAllUsers } from "src/app/store/selectors/users.selectors";

@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.scss"]
})
export class UserListComponent implements OnInit {
  dataSource: MatTableDataSource<User>;
  displayedColumns: string[] = ["email", "username", "name", "groups", "id"];

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store.dispatch(new LoadUsers());

    this.store.pipe(select(selectAllUsers)).subscribe(users => {
      this.dataSource = new MatTableDataSource(users);
    });
  }
}
