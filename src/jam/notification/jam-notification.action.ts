import { Action } from '@ngrx/store';
import { KeyValue } from '../../jam/model-library';
import { NotificationMessage } from './notification-message.model';

export const enum NotificationActionTypes
{
	initialize = '[Notification] initialize',
	open = '[Notification] open',
	closed = '[Notification] closed'
}

export namespace NotificationAction
{

	export class Initialize implements Action
	{
		public readonly type = NotificationActionTypes.initialize;
		constructor ( public defaultMessage: NotificationMessage ) { }
	}

	export class Open implements Action
	{
		public readonly type = NotificationActionTypes.open;
		constructor ( public message: NotificationMessage ) { }
	}

	export class Closed implements Action
	{
		public readonly type = NotificationActionTypes.closed;
		constructor () { }
	}

	export type All
		= Initialize
		| Open
		| Closed
		;

}
