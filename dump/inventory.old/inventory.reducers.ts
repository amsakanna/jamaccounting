import { InventoryState } from './inventory.state';
import { InventoryActionTypes, InventoryAction } from './inventory.actions';
import { JamEntityAdapter } from '../../jam/ngrx';
import { InventoryItem } from '../model';

const inventoryAdapter = new JamEntityAdapter<InventoryItem, InventoryState>();
const initialState = inventoryAdapter.getInitialState( { tree: null } );

export function inventoryReducers ( state = initialState, action: InventoryAction.All ): InventoryState
{
	switch ( action.type ) {
		case InventoryActionTypes.initialize: return inventoryAdapter.initialize( state );
		case InventoryActionTypes.initialized: return { ...inventoryAdapter.initialized( state, action.list, action.defaultItem ), tree: action.tree };
		case InventoryActionTypes.select: return inventoryAdapter.select( state, action.key );
		case InventoryActionTypes.selected: return inventoryAdapter.selected( state, action.item );
		case InventoryActionTypes.selectFailed: return inventoryAdapter.selectFailed( state );
		case InventoryActionTypes.create: return inventoryAdapter.create( state );
		case InventoryActionTypes.cancelCreate: return inventoryAdapter.cancelCreate( state );
		case InventoryActionTypes.add: return inventoryAdapter.add( state, action.item );
		case InventoryActionTypes.added: return inventoryAdapter.added( state, action.item );
		case InventoryActionTypes.edit: return inventoryAdapter.edit( state, action.item );
		case InventoryActionTypes.cancelEdit: return inventoryAdapter.cancelEdit( state );
		case InventoryActionTypes.modify: return inventoryAdapter.modify( state, action.item );
		case InventoryActionTypes.modified: return inventoryAdapter.modified( state, action.item );
		default: return state;
	}
}