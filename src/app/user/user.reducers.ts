import { UserState } from './user.state';
import { UserActionTypes, UserAction } from './user.actions';
import { User } from '../../jam-auth/jam-auth';

const initialState: UserState = {
	loading: false,
	loaded: false,
	userAccount: null
};

export function userReducers ( state = initialState, action: UserAction.All ): UserState
{
	switch ( action.type ) {
		case UserActionTypes.load: return { ...state, loading: true };
		case UserActionTypes.loaded: return { ...state, userAccount: action.item, loaded: true, loading: false };
		case UserActionTypes.unload: return { ...state, userAccount: null, loaded: false };
		case UserActionTypes.add: return { ...state };
		case UserActionTypes.added: return { ...state };
		case UserActionTypes.addFailed: return { ...state };
		case UserActionTypes.archive: return { ...state };
		case UserActionTypes.archived: return { ...state };
		case UserActionTypes.archiveFailed: return { ...state };
		default: return state;
	}
}