import { User } from 'src/app/models/User';

export interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    error: any;
    loading: boolean;
}
  
export const initialAuthState: AuthState = {
    isAuthenticated: false,
    user: null,
    error: null,
    loading: false
};