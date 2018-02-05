import { EventBrokerState } from './jam-event-broker.state';
import { EventBrokerActionTypes, EventBrokerAction } from './jam-event-broker.action';

const initialState: EventBrokerState = {
	eventPairs: []
}

export function eventBrokerReducer ( state = initialState, action: EventBrokerAction.All ): EventBrokerState
{
	switch ( action.type ) {

		case EventBrokerActionTypes.initialize:
			return {
				...state
			};

		default:
			return state;
	}
}
