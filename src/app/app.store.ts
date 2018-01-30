import { ActionReducerMap } from "@ngrx/store";

import { CoreState, coreReducers, CoreEffects } from './core/core.store';
import { NavigatorState, navigatorReducers, NavigatorEffects } from '../jam/navigator';
import { AuthState, authReducers, AuthEffects } from '../jam/auth';
import { DatabaseState, databaseReducers, DatabaseEffects } from '../jam/firestore';
import { NotificationState, notificationReducer, NotificationEffect } from '../jam/notification';

/**
 * All States
 */

export interface AppModuleState
{
	coreState: CoreState;
	navigatorState: NavigatorState;
	authState: AuthState;
	databaseState: DatabaseState;
	notificationState: NotificationState;
}

/**
 * All Reducers
 */


export const appReducers: ActionReducerMap<AppModuleState> = {
	coreState: coreReducers,
	navigatorState: navigatorReducers,
	authState: authReducers,
	databaseState: databaseReducers,
	notificationState: notificationReducer
}

/**
 * All Effects
 */

export const appEffects = [
	CoreEffects,
	NavigatorEffects,
	DatabaseEffects,
	AuthEffects,
	NotificationEffect
]
