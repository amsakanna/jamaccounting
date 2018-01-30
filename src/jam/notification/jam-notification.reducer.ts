import { NotificationState } from './jam-notification.state';
import { NotificationActionTypes, NotificationAction } from './jam-notification.action';
import { NotificationMessage } from './notification-message.model';

const initialState: NotificationState = {
	notifying: false,
	currentMessage: null,
	messageHistory: [],
	triggers: []
}

export function notificationReducer ( state = initialState, action: NotificationAction.All )
{
	switch ( action.type ) {

		case NotificationActionTypes.show:
			return {
				...state,
				notifying: true,
				currentMessage: action.message,
				messageHistory: [ ...state.messageHistory, action.message ]
			};

		case NotificationActionTypes.close:
			return {
				...state,
				currentMessage: { ...state.currentMessage, attended: true }
			};

		case NotificationActionTypes.closed:
			return {
				...state,
				notifying: false
			};

		case NotificationActionTypes.addTrigger:
			return {
				...state,
				triggers: [ ...state.triggers, action.trigger ]
			};

		default:
			return state;
	}
}
