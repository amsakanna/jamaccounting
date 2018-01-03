import { ActionReducerMap } from "@ngrx/store/src/models";
import { AppState } from './app.state';
import { coreReducers } from "./core/core.store";
import { navigatorReducers } from "../jam/navigator";
import { authReducers } from "../jam/auth";
import { databaseReducers } from "../jam/firestore";

export const appReducers: ActionReducerMap<AppState> = {
	coreState: coreReducers,
	navigatorState: navigatorReducers,
	authState: authReducers,
	databaseState: databaseReducers
}