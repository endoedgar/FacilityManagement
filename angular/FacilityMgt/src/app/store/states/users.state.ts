import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { User } from "src/app/models/User";

export interface UsersState extends EntityState<User> {
  loading: boolean;
  error: any;
}

export const usersAdapter: EntityAdapter<User> = createEntityAdapter<User>({
  selectId: instance => instance._id
});

export const initialUsersState: UsersState = usersAdapter.getInitialState({
  loading: false,
  error: null
});
