import { NotificationMessage } from './notification-message.model';

export interface NotificationModuleState
{
	notificationState: NotificationState
}

export interface NotificationState
{
	notifying: boolean;
	currentMessage: NotificationMessage;
	messageHistory: NotificationMessage[];
	triggers: string[];
}
