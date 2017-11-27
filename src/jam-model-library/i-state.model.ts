import { JamEntityState } from './i-state.model';

export interface JamEntityState<T>
{
	loading: boolean;
	editing: boolean;
	creating: boolean;

	list: T[];
	selectedItem: string;
	itemBeingCreated: T;
	itemBeingEdited: T;
	itemBeingDeleted: string;
	lastCreatedItem: T;
	lastEditedItem: T;
	lastDeletedItem: T;
}

export class JamEntityAdapter<T>
{

	public create ( state: JamEntityState<T> )
	{
		return { ...state, creating: true };
	}

	public edit ( state: JamEntityState<T>, item: T )
	{
		return { ...state, editing: true, itemBeingEdited: item }
	}

	public delete ( state: JamEntityState<T>, itemKey: string )
	{
		return { ...state, editing: true, itemBeingDeleted: itemKey }
	}

	public insert ( state: JamEntityState<T>, item: T )
	{
		return { ...state, editing: true, itemBeingCreated: item }
	}

}