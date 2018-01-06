import { FormGroup } from "@angular/forms";
import { Data } from "../../../jam/model-library";
import { JamEntityState } from "./jam-entity.state";
import { buildFormFromModel } from "../../functions/build-form-from-model.function";

export class JamEntityAdapter<T extends Data, S extends JamEntityState<T> = JamEntityState<T>>
{

	public getInitialState ( additionalStates: any = {} ): S
	{
		const entityState: JamEntityState<T> = {
			initialized: false,
			list: [],
			form: null,
			loading: false,
			creating: false,
			editing: false,
			adding: false,
			modifying: false,
			removing: false,
			defaultItem: null,
			selectedItem: null,
			emptyItem: null,
			formItem: null,
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
			lastRemovedItemIndex: -1
		};
		return { ...entityState, ...additionalStates };
	}

	private newState ( state: S, newObject?: any )
	{
		return Object.assign( {}, state, newObject );
	}

	public initialize ( state: S ): S
	{
		return this.newState( state, { initialized: false, loading: true } );
	}

	public initialized ( state: S, list: T[], defaultItem: T = null, emptyItem: T = null, formElements: any = null ): S
	{
		return this.newState( state, {
			initialized: true,
			loading: false,
			defaultItem: defaultItem,
			emptyItem: emptyItem,
			form: new FormGroup( formElements ),
			list: list
		} );
	}

	public initializeFailed ( state: S ): S
	{
		return this.newState( state, { initialized: false, loading: false } );
	}

	public reloaded ( state: S ): S
	{
		return this.newState( state, { loading: false } );
	}

	public select ( state: S, key: string ): S
	{
		return this.newState( state, key ? { itemBeingSelectedKey: key } : {} );
	}

	public selected ( state: S, item: T ): S
	{
		return this.newState( state, { selectedItem: item } );
	}

	public selectFailed ( state: S ): S
	{
		return this.newState( state );
	}

	public create ( state: S ): S
	{
		state.form.reset();
		const formItem = JSON.parse( JSON.stringify( state.emptyItem ) );
		return this.newState( state, {
			creating: true,
			itemBeingCreated: formItem,
			formItem: formItem,
			form: buildFormFromModel( state.formItem, state.form )
		} );
	}

	public cancelCreate ( state: S ): S
	{
		return this.newState( state, { creating: false, itemBeingCreated: null } );
	}

	public add ( state: S, item: T ): S
	{
		return this.newState( state, { adding: true, itemBeingAdded: item } );
	}

	public added ( state: S, item: T ): S
	{
		return this.newState( state, {
			adding: false,
			lastAddedItem: item,
			itemBeingAdded: null,
			creating: false
		} );
	}

	public addFailed ( state: S ): S
	{
		return this.newState( state, { adding: false, itemBeingAdded: null } );
	}

	public edit ( state: S, item: T ): S
	{
		const formItem = JSON.parse( JSON.stringify( item ) );
		return this.newState( state, { editing: true, itemBeingEdited: item, formItem: formItem } );
	}

	public cancelEdit ( state: S ): S
	{
		return this.newState( state, { editing: false, itemBeingEdited: null } );
	}

	public modify ( state: S, item: T ): S
	{
		return this.newState( state, { modifying: true, itemBeingModified: item } );
	}

	public modified ( state: S, item: T ): S
	{
		return this.newState( state, {
			modifying: false,
			lastModifiedItem: item,
			itemBeingModified: null,
			editing: false
		} );
	}

	public modifyFailed ( state: S ): S
	{
		return this.newState( state, { modifying: false, itemBeingModified: null } );
	}

	public remove ( state: S, itemKey: string ): S
	{
		const itemBeingRemovedIndex = state.list.findIndex( item => item.key == itemKey );
		return this.newState( state, {
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
		return this.newState( state, {
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
		return this.newState( state, {
			removing: false,
			itemBeingRemovedKey: null,
			itemBeingRemovedIndex: -1
		} );
	}

}