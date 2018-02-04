import { NotificationMessage } from "./notification-message.model";

export interface ActionMessagePair
{
	actionType: RegExp | string;
	message: NotificationMessage;
}
