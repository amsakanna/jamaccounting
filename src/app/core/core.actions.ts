import { Action } from '@ngrx/store';

export const coreAction = '[Core] core action ...';
export class CoreAction implements Action
{
	public readonly type = coreAction;

	constructor ( public payload: string )
	{
	}
}

export const coreSuccessAction = '[Core] coreSuccess action ...';
export class CoreSuccessAction implements Action
{
	public readonly type = coreSuccessAction;

	constructor ( public payload: string )
	{
	}
}

export type All
	= CoreAction
	| CoreSuccessAction;
