import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { User } from "src/app/models/User";
import { AppState } from "src/app/store/states/app.state";
import { SignUp, UpdateProfile } from "src/app/store/actions/auth.actions";
import { selectAuthLoading, selectLoggedinUser } from "src/app/store/selectors/auth.selectors";
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: "app-settings-login",
  templateUrl: "./user-settings.component.html",
  styleUrls: ["./user-settings.component.scss"]
})
export class UserSettingsComponent implements OnInit {
  user: User = new User();
  loading$ = this.store.select(selectAuthLoading);
  loggedInUser$ = this.store.select(selectLoggedinUser);
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.loggedInUser$.subscribe(user => this.user = user ? {...user, groups: [ ...user?.groups ]} : null);
  }

  onSubmit(): void {
    this.store.dispatch(UpdateProfile({ user: this.user }));
  }

  addGroup(event: MatChipInputEvent) {
    const input = event.input;
    const value = event.value;
    if ((value.trim() !== '')) {
      this.user.groups.push(value);
      input.value = '';
    }
  }

  onRemoveGroup(group: any) {
    let index = this.user.groups.indexOf(group, 0);
    if (index > -1) {
      this.user.groups.splice(index, 1);
    }
  }
}
