import { Action } from '@ngrx/store';
import { KeyValue } from '../../jam/model-library';
import { NotificationMessage } from './notification-message.model';

export const enum NotificationActionTypes
{
	initialize = '[Notification] initialize',
	show = '[Notification] show',
	close = '[Notification] close',
	closed = '[Notification] closed',
	addTrigger = '[Notification] add trigger'
}

export namespace NotificationAction
{

	export class Initialize implements Action
	{
		public readonly type = NotificationActionTypes.initialize;
		constructor () { }
	}

	export class Show implements Action
	{
		public readonly type = NotificationActionTypes.show;
		public message: NotificationMessage;
		constructor ( message?: string, action?: string, duration?: number )
		{
			this.message = {
				content: message,
				action: action,
				duration: duration,
				attended: false
			}
		}
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

	export class AddTrigger implements Action
	{
		public readonly type = NotificationActionTypes.addTrigger;
		constructor ( public trigger: string ) {}
	}

	export type All
		= Show
		| Close
		| Closed
		| AddTrigger
		;

}
