import { CoreState } from './core/core.store';
import { NavigatorState } from '../jam/navigator';
import { AuthState } from '../jam/auth';
import { DatabaseState } from '../jam/firestore';

export interface AppState
{
	coreState: CoreState;
	navigatorState: NavigatorState;
	authState: AuthState;
	databaseState: DatabaseState;
}