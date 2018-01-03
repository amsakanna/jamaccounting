import { Data } from "../../../jam/model-library";
import { JamEntityState } from "./jam-entity-state.model";

export class JamEntityAdapter<T extends Data, S extends JamEntityState<T> = JamEntityState<T>>
{

	public getInitialState ( additionalStates: any = {} ): S
	{
		return {
			initialized: false,
			list: new Array<T>(),
			loading: false,
			creating: false,
			editing: false,
			adding: false,
			modifying: false,
			removing: false,
			defaultItem: null,
			selectedItem: null,
			itemBeingSelectedKey: null,
			itemBeingCreated: null,
			itemBeingEdited: null,
			itemBeingAdded: null,
			itemBeingModified: null,
			itemBeingRemovedKey: null,
			itemBeingRemovedIndex: -1,
			lastAddedItem: null,
			lastModifiedItem: null,
			lastRemovedItem: null,
			lastRemovedItemIndex: -1,
			...additionalStates
		};
	}

	public initialize ( state: S ): S
	{
		return Object.assign( {}, state, { initialized: false, loading: true } );
	}

	public initialized ( state: S, list: T[], defaultItem: T ): S
	{
		return Object.assign( {}, state, { initialized: true, list: list, defaultItem: defaultItem, loading: false } );
	}

	public initializeFailed ( state: S ): S
	{
		return Object.assign( {}, state, { initialized: false, loading: false } );
	}

	public reloaded ( state: S ): S
	{
		return Object.assign( {}, state, { loading: false } );
	}

	public select ( state: S, key: string ): S
	{
		return Object.assign( {}, state, key ? { itemBeingSelectedKey: key } : {} );
	}

	public selected ( state: S, item: T ): S
	{
		return Object.assign( {}, state, { selectedItem: item } );
	}

	public selectFailed ( state: S ): S
	{
		return Object.assign( {}, state );
	}

	public create ( state: S ): S
	{
		return Object.assign( {}, state, { creating: true } );
	}

	public cancelCreate ( state: S ): S
	{
		return Object.assign( {}, state, { creating: false, itemBeingCreated: null } );
	}

	public edit ( state: S, item: T ): S
	{
		return Object.assign( {}, state, { editing: true, itemBeingEdited: item } );
	}

	public cancelEdit ( state: S ): S
	{
		return Object.assign( {}, state, { editing: false, itemBeingEdited: null } );
	}

	public add ( state: S, item: T ): S
	{
		return Object.assign( {}, state, { adding: true, itemBeingAdded: item } );
	}

	public added ( state: S, item: T ): S
	{
		return Object.assign( {}, state, {
			adding: false,
			lastAddedItem: item,
			itemBeingAdded: null,
			creating: false
		} );
	}

	public modify ( state: S, item: T ): S
	{
		return Object.assign( {}, state, { modifying: true, itemBeingCreated: item } );
	}

	public modified ( state: S, item: T ): S
	{
		return Object.assign( {}, state, {
			modifying: false,
			lastModifiedItem: item,
			itemBeingModified: null,
			editing: false
		} );
	}

	public remove ( state: S, itemKey: string ): S
	{
		const itemBeingRemovedIndex = state.list.findIndex( item => item.key == itemKey );
		return Object.assign( {}, state, {
			removing: true,
			itemBeingRemovedKey: itemKey,
			itemBeingRemovedIndex: itemBeingRemovedIndex
		} );
	}

	public removed ( state: S, item: T ): S
	{
		const itemToBeSelected: Data = state.list[ state.itemBeingRemovedIndex ]
			|| state.list[ state.itemBeingRemovedIndex - 1 ]
			|| { key: null };
		return Object.assign( {}, state, {
			removing: false,
			lastRemovedItem: item,
			lastRemovedItemIndex: state.itemBeingRemovedIndex,
			itemBeingRemovedKey: null,
			itemBeingRemovedIndex: -1,
			itemBeingSelectedKey: itemToBeSelected.key
		} );
	}

	public removeFailed ( state: S ): S
	{
		return Object.assign( {}, state, { removing: false } );
	}

}