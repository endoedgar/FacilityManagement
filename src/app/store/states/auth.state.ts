import { User } from 'src/app/models/User';

export interface AuthState {
    user: User | null;
    error: any;
    loading: boolean;
}
  
export const initialAuthState: AuthState = {
    user: null,
    error: null,
    loading: false
};