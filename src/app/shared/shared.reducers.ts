import { SharedState } from './shared.state';
import { SharedActionTypes, SharedAction } from './shared.actions';
import { Error } from '../../jam/model-library';
import { Tables } from './tables.model';

const initialState: SharedState = {
	initialized: false,
	processing: false,
	error: new Error(),
	tables: new Tables()
}

export function sharedReducers ( state = initialState, action: SharedAction.All )
{
	switch ( action.type ) {

		case SharedActionTypes.initialize:
			return {
				...state,
				initialized: false,
				processing: true
			};

		case SharedActionTypes.initialized:
			return {
				...state,
				initialized: true,
				processing: false
			};

		case SharedActionTypes.initializeFailed:
			return {
				...state,
				initialized: false,
				processing: false
			};

		default:
			return state;
	}
}
