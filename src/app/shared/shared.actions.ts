import { Action } from '@ngrx/store';

export const enum SharedActionTypes
{
	initialize = '[Shared] initialize',
	initialized = '[Shared] initialized',
	initializeFailed = '[Shared] initialize failed',
}

export namespace SharedAction
{

	export class Initialize implements Action
	{
		public readonly type = SharedActionTypes.initialize;
		constructor () { }
	}

	export class Initialized implements Action
	{
		public readonly type = SharedActionTypes.initialized;
		constructor () { }
	}

	export class InitializeFailed implements Action
	{
		public readonly type = SharedActionTypes.initializeFailed;
		constructor () { }
	}

	export type All
		= Initialize
		| Initialized
		| InitializeFailed
		;

}
