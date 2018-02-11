import { JamEntityState } from "./jam-entity.state";
import { JamEntityActions } from "./jam-entity.actions";
import { buildFormFromModel } from "../../functions/build-form-from-model.function";
import { JamEntityAction } from "./jam-entity-action.model";

export class JamEntityAdapter<
	T,
	S extends JamEntityState<T> = JamEntityState<T>,
	A extends JamEntityAction<T> = JamEntityAction<T>,
	AS extends JamEntityActions<T> = JamEntityActions<T>
	>
{

	public readonly actions: AS;
	private readonly additionalStates: Partial<S>;

	constructor ( actions: AS = null, additionalStates: Partial<S> = {} )
	{
		this.actions = actions;
		this.additionalStates = additionalStates;
	}

	public get reducer (): ( state: S, action: A ) => S
	{
		const initialState = this.getInitialState( this.additionalStates );
		const adapter = this;
		const actions = this.actions;
		return ( state: S = initialState, action: A ) =>
		{
			switch ( action.type ) {
				case actions.initialize: return adapter.initialize( state );
				case actions.initialized: return adapter.initialized( state, action.list, action.extras, action.defaultItem );
				case actions.select: return adapter.select( state, action.key );
				case actions.selected: return adapter.selected( state, action.item, action.extras );
				case actions.selectFailed: return adapter.selectFailed( state );
				case actions.create: return adapter.create( state );
				case actions.cancelCreate: return adapter.cancelCreate( state );
				case actions.add: return adapter.add( state, action.item );
				case actions.added: return adapter.added( state, action.item );
				case actions.addFailed: return adapter.addFailed( state );
				case actions.edit: return adapter.edit( state, action.item );
				case actions.cancelEdit: return adapter.cancelEdit( state );
				case actions.modify: return adapter.modify( state, action.item );
				case actions.modified: return adapter.modified( state, action.item );
				case actions.modifyFailed: return adapter.modifyFailed( state );
				case actions.remove: return adapter.remove( state, action.key );
				case actions.removed: return adapter.removed( state, action.item );
				case actions.removeFailed: return adapter.removeFailed( state );
				default: return state;
			}
		};
	}

	public getInitialState ( additionalStates: Partial<S> = {} ): S
	{
		const entityState: JamEntityState<T> = {
			initialized: false,
			list: [],
			form: null,
			processing: false,
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
			defaultItemKey: null,
			selectedItemKey: null,
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
		return this.newState( entityState as S, additionalStates );
	}

	public newState ( state: S, newObject: any = {} ): S
	{
		return Object.assign( {}, state, newObject );
	}

	public initialize ( state: S ): S
	{
		return this.newState( state, { initialized: false, loading: true, processing: true } );
	}

	public initialized ( state: S, list: T[], extras: any = {}, defaultItem: T = null, keyColumn: string = 'key' ): S
	{
		console.log( extras );
		defaultItem = defaultItem || list[ 0 ];
		return this.newState( state, Object.assign( {
			initialized: true,
			loading: false,
			processing: false,
			defaultItemKey: defaultItem ? defaultItem[ keyColumn ] : null,
			list: list
		}, extras ) );
	}

	public initializeFailed ( state: S ): S
	{
		return this.newState( state, { initialized: false, loading: false, processing: false } );
	}

	public reloaded ( state: S ): S
	{
		return this.newState( state, { loading: false, processing: false } );
	}

	public select ( state: S, key: string, keyColumn: string = 'key' ): S
	{
		const selectKey = key || state.defaultItemKey;
		const selectedItem = ( selectKey && state.list.find( item => item[ keyColumn ] == selectKey ) ) || state.selectedItem;
		console.log( selectKey, selectedItem );
		return this.newState( state, { selectedItem: selectedItem } );
	}

	public selected ( state: S, item: T, extras: Partial<S> = {} ): S
	{
		return this.newState( state, Object.assign( { selectedItem: item }, extras ) );
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
			form: buildFormFromModel( formItem, state.form )
		} );
	}

	public cancelCreate ( state: S ): S
	{
		return this.newState( state, { creating: false, itemBeingCreated: null } );
	}

	public add ( state: S, item: T ): S
	{
		return this.newState( state, { adding: true, processing: true, itemBeingAdded: item } );
	}

	public added ( state: S, item: T ): S
	{
		return this.newState( state, {
			creating: false,
			adding: false,
			processing: false,
			lastAddedItem: item,
			itemBeingAdded: null,
		} );
	}

	public addFailed ( state: S ): S
	{
		return this.newState( state, { adding: false, processing: false, itemBeingAdded: null } );
	}

	public edit ( state: S, item: T ): S
	{
		const formItem = JSON.parse( JSON.stringify( item ) );
		return this.newState( state, {
			editing: true,
			itemBeingEdited: item,
			formItem: formItem,
			form: buildFormFromModel( formItem, state.form )
		} );
	}

	public cancelEdit ( state: S ): S
	{
		return this.newState( state, { editing: false, itemBeingEdited: null } );
	}

	public modify ( state: S, item: T ): S
	{
		return this.newState( state, { modifying: true, processing: true, itemBeingModified: item } );
	}

	public modified ( state: S, item: T ): S
	{
		return this.newState( state, {
			editing: false,
			modifying: false,
			processing: false,
			lastModifiedItem: item,
			itemBeingModified: null
		} );
	}

	public modifyFailed ( state: S ): S
	{
		return this.newState( state, { modifying: false, processing: false, itemBeingModified: null } );
	}

	public remove ( state: S, itemKey: string, keyColumn: string = 'key' ): S
	{
		const itemBeingRemovedIndex = state.list.findIndex( item => item[ keyColumn ] == itemKey );
		return this.newState( state, {
			removing: true,
			processing: true,
			itemBeingRemovedKey: itemKey,
			itemBeingRemovedIndex: itemBeingRemovedIndex
		} );
	}

	public removed ( state: S, item: T, keyColumn: string = 'key' ): S
	{
		const itemToBeSelected = state.list[ state.itemBeingRemovedIndex ]
			|| state.list[ state.itemBeingRemovedIndex - 1 ]
			|| { key: null };
		return this.newState( state, {
			removing: false,
			processing: false,
			lastRemovedItem: item,
			lastRemovedItemIndex: state.itemBeingRemovedIndex,
			itemBeingRemovedKey: null,
			itemBeingRemovedIndex: -1,
			itemBeingSelectedKey: itemToBeSelected[ keyColumn ]
		} );
	}

	public removeFailed ( state: S ): S
	{
		return this.newState( state, {
			removing: false,
			processing: false,
			itemBeingRemovedKey: null,
			itemBeingRemovedIndex: -1
		} );
	}

}
