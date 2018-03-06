import { ViewContainerRef } from '@angular/core';
import { NotificationMessage } from './notification-message.model';

export interface NotificationModuleState
{
	notificationState: NotificationState
}

export interface NotificationState
{
	notifying: boolean;
	defaultMessage: NotificationMessage;
	currentMessage: NotificationMessage;
	messageHistory: NotificationMessage[];
	viewContainerRef: ViewContainerRef;
}
