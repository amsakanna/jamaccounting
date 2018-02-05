import { CoreState } from './core.state';
import * as CoreActions from './core.actions';

const initialState: CoreState = {
	names: []
}

export function coreReducers ( state = initialState, action: CoreActions.All )
{
	switch ( action.type ) {

		case CoreActions.coreAction:
			return {
				...state,
				processing: true
			};

		case CoreActions.coreSuccessAction:
			return {
				...state,
				names: [ ...state.names, action.payload ],
				processing: false
			};

		default:
			return state;
	}
}
