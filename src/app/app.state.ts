import { CoreState } from './core/core.store';
import { NavigatorState } from '../jam-navigator/jam-navigator';
import { AuthState } from '../jam-auth/jam-auth';

export interface AppState
{
	coreState: CoreState;
	navigatorState: NavigatorState;
	authState: AuthState;
}