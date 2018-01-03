import { AppState } from "../app.store";
import { UserAccount } from '../model';
import { User } from "../../jam/auth";

export interface UserModuleState extends AppState
{
	userState: UserState;
}

export interface UserState
{
	loading: boolean;
	loaded: boolean;
	userAccount: UserAccount;
}