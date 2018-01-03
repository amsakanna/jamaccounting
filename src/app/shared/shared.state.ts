import { Error } from '../../jam/model-library';
import { Tables } from "./tables.model";

export interface SharedModuleState
{
	sharedState: SharedState;
}

export interface SharedState
{
	initialized: boolean;
	processing: boolean;
	error: Error;
	tables: Tables;
}