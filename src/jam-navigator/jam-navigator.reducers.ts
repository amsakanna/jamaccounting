import { NavigatorState } from './jam-navigator.state';
import { NavigatorActionTypes, NavigatorAction } from './jam-navigator.actions';
import { KeyValue } from '../jam-model-library/jam-model-library';

const initialState: NavigatorState = {
	initialized: false,
	loading: false,
	navigating: false,
	pages: null,
	params: new Array<KeyValue>(),
	previousPage: null,
	currentPage: null,
	requestedPage: null,
	resolvedRequestedPage: null,
	navigatedToPage: null,
	reason: null,
	error: null
}

export function navigatorReducers ( state = initialState, action: NavigatorAction.All )
{
	switch ( action.type ) {

		case NavigatorActionTypes.initialize:
			console.log( action );
			return {
				...state,
				pages: action.pages,
				initialized: true,
				loading: false
			};

		case NavigatorActionTypes.initialized:
			return {
				...state,
				initialized: true,
				loading: false
			};

		case NavigatorActionTypes.navigate:
			return {
				...state,
				loading: true,
				navigating: true,
				requestedPage: action.page,
				navigatedToPage: null,
			};

		case NavigatorActionTypes.routeResolved:
			return {
				...state,
				resolvedRequestedPage: action.page,
				params: action.params,
			};

		case NavigatorActionTypes.routeResolveFailed:
			return {
				...state,
				resolvedRequestedPage: null
			};

		case NavigatorActionTypes.navigateBack:
			return {
				...state,
				loading: true,
				navigating: true,
				requestedPage: state.previousPage,
				navigatedToPage: null,
			};

		case NavigatorActionTypes.navigated:
			return {
				...state,
				loading: false,
				navigating: false,
				requestedPage: null,
				resolvedRequestedPage: null,
				navigatedToPage: action.page,
				previousPage: state.currentPage,
				currentPage: action.page,
				params: action.params,
				reason: null,
				error: null
			};

		case NavigatorActionTypes.navigateFailed:
			return {
				...state,
				loading: false,
				navigating: false,
				requestedPage: null,
				resolvedRequestedPage: null,
				navigatedToPage: null,
				reason: action.reason,
				error: action.error
			};

		case NavigatorActionTypes.navigateRejected:
			console.log( 'rejected', action.reason );
			return {
				...state,
				loading: false,
				navigating: false,
				requestedPage: null,
				resolvedRequestedPage: null,
				navigatedToPage: null,
				reason: action.reason
			};

		default:
			return state;
	}
}
