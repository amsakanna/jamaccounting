import { Action } from "@ngrx/store";

export interface JamEntityAction<T> extends Action
{
	fnName?: string;
	key?: string;
	item?: T;
	list?: T[];
	defaultItem?: T;
	extras?: any;
}
