import { User } from "./user.model";

export interface AuthModuleState
{
	authState: AuthState;
}

export interface AuthState
{
	initialized: boolean;
	loading: boolean;
	user: User,
	authenticated: boolean;
	registering: boolean;
	signingIn: boolean;
	signingOut: boolean;
	deletingUser: boolean;
	lastError: string;
}