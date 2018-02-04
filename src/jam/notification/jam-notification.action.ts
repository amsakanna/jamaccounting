import { Action } from '@ngrx/store';
import { KeyValue } from '../../jam/model-library';
import { NotificationMessage } from './notification-message.model';
import { ActionMessagePair } from './action-message-pair.model';

export const enum NotificationActionTypes
{
	initialize = '[Notification] initialize',
	open = '[Notification] open',
	close = '[Notification] close',
	closed = '[Notification] closed',
	addTriggers = '[Notification] add triggers'
}

export namespace NotificationAction
{

	export class Initialize implements Action
	{
		public readonly type = NotificationActionTypes.initialize;
		constructor ( public defaultMessage: NotificationMessage, public triggers: ActionMessagePair[] ) { }
	}

	export class Open implements Action
	{
		public readonly type = NotificationActionTypes.open;
		constructor ( public message: NotificationMessage ) { }
	}

	export class Close implements Action
	{
		public readonly type = NotificationActionTypes.close;
		constructor () { }
	}

	export class Closed implements Action
	{
		public readonly type = NotificationActionTypes.closed;
		constructor () { }
	}

	export class AddTriggers implements Action
	{
		public readonly type = NotificationActionTypes.addTriggers;
		public triggers: ActionMessagePair[];
		constructor ( ...triggers: ActionMessagePair[] ) { this.triggers = triggers; }
	}

	export type All
		= Initialize
		| Open
		| Close
		| Closed
		| AddTriggers
		;

}
