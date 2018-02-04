import { NotificationState } from './jam-notification.state';
import { NotificationActionTypes, NotificationAction } from './jam-notification.action';
import { NotificationMessage } from './notification-message.model';

const initialState: NotificationState = {
	notifying: false,
	defaultMessage: null,
	currentMessage: null,
	messageHistory: [],
	triggers: []
}

export function notificationReducer ( state = initialState, action: NotificationAction.All ): NotificationState
{
	switch ( action.type ) {

		case NotificationActionTypes.initialize:
			return {
				...state,
				defaultMessage: action.defaultMessage,
				triggers: action.triggers
			};

		case NotificationActionTypes.open:
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
				currentMessage: { ...state.currentMessage, attended: true },
				notifying: false
			};

		case NotificationActionTypes.addTriggers:
			return {
				...state,
				triggers: [ ...state.triggers, ...action.triggers ]
			};

		default:
			return state;
	}
}
