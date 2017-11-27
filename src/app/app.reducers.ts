import { ActionReducerMap } from "@ngrx/store/src/models";
import { AppState } from './app.state';
import { coreReducers } from "./core/core.store";
import { navigatorReducers } from "../jam-navigator/jam-navigator";
import { authReducers } from "../jam-auth/jam-auth";

export const appReducers: ActionReducerMap<AppState> = {
	coreState: coreReducers,
	navigatorState: navigatorReducers,
	authState: authReducers
}