/**
 * All States
 */

import { CoreState } from './core/core.store';
import { NavigatorState } from '../jam/navigator';
import { AuthState } from '../jam/auth';
import { DatabaseState } from '../jam/firestore';

export interface AppModuleState
{
	coreState: CoreState;
	navigatorState: NavigatorState;
	authState: AuthState;
	databaseState: DatabaseState;
}

/**
 * All Reducers
 */

import { ActionReducerMap } from "@ngrx/store";
import { coreReducers } from "./core/core.store";
import { navigatorReducers } from "../jam/navigator";
import { authReducers } from "../jam/auth";
import { databaseReducers } from "../jam/firestore";

export const appReducers: ActionReducerMap<AppModuleState> = {
	coreState: coreReducers,
	navigatorState: navigatorReducers,
	authState: authReducers,
	databaseState: databaseReducers
}

/**
 * All Effects
 */

import { CoreEffects } from "./core/core.store";
import { NavigatorEffects } from "../jam/navigator";
import { DatabaseEffects } from "../jam/firestore";
import { AuthEffects } from "../jam/auth";

export const appEffects = [
	CoreEffects,
	NavigatorEffects,
	DatabaseEffects,
	AuthEffects
]