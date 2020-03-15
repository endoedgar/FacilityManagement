import { User } from 'src/app/models/User';

export interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    errorMessage: string | null;
}
  
export const initialAuthState: AuthState = {
    isAuthenticated: false,
    user: null,
    errorMessage: null
};