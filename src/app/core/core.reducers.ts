import { CoreState } from './core.state';
import { CoreActionTypes, CoreAction } from './core.actions';

const initialState: CoreState = {
	featureModules: [],
	dialogs: []
}

export function coreReducers ( state = initialState, action: CoreAction.All ): CoreState
{
	switch ( action.type ) {

		case CoreActionTypes.addModule:
			return {
				...state,
				featureModules: [ ...state.featureModules, action.featureModule ],
				dialogs: [ ...state.dialogs, ...action.featureModule.dialogs ]
			};

		default:
			return state;
	}
}
