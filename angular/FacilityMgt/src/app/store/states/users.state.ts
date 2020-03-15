import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { User } from "src/app/models/User";

export interface UsersState extends EntityState<User> {
  errorMessage: string | null;
  loading: boolean;
}

export const usersAdapter: EntityAdapter<User> = createEntityAdapter<User>({
  selectId: instance => instance._id
});

export const initialUsersState: UsersState = usersAdapter.getInitialState({
  errorMessage: null,
  loading: false
});
