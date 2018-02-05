import { Action } from "@ngrx/store";

export interface EventPair
{
	if: RegExp | string;
	then: Action[];
}
