import { Action } from '@ngrx/store';

export const enum EventBrokerActionTypes
{
	initialize = '[EventBroker] initialize',
}

export namespace EventBrokerAction
{

	export class Initialize implements Action
	{
		public readonly type = EventBrokerActionTypes.initialize;
		constructor () { }
	}


	export type All
		= Initialize
		;

}
