import { InventoryActionTypes, InventoryAction } from './inventory.actions';
import { JamEntityAdapter } from '../../jam/ngrx';
import { InventoryState } from './inventory.state';
import { Inventory } from '../model';

const inventoryAdapter = new JamEntityAdapter<Inventory, InventoryState>();
const initialState = inventoryAdapter.getInitialState( {
	selectedItemProduct: null,
	selectedItemCategory: null,
	taxList: []
} );

export function inventoryReducers ( state = initialState, action: InventoryAction.All ): InventoryState
{
	switch ( action.type ) {
		case InventoryActionTypes.initialize: return inventoryAdapter.initialize( state );
		case InventoryActionTypes.initialized: return inventoryAdapter.initialized( state, action.list, null, { taxList: action.taxList } );
		case InventoryActionTypes.select: return inventoryAdapter.select( state, action.key );
		case InventoryActionTypes.selected: return inventoryAdapter.selected( state, action.item, { selectedItemProduct: action.product, selectedItemCategory: action.category } );
		case InventoryActionTypes.selectFailed: return inventoryAdapter.selectFailed( state );
		case InventoryActionTypes.create: return inventoryAdapter.create( state );
		case InventoryActionTypes.cancelCreate: return inventoryAdapter.cancelCreate( state );
		case InventoryActionTypes.add: return inventoryAdapter.add( state, action.item );
		case InventoryActionTypes.added: return inventoryAdapter.added( state, action.item );
		case InventoryActionTypes.edit: return inventoryAdapter.edit( state, action.item );
		case InventoryActionTypes.cancelEdit: return inventoryAdapter.cancelEdit( state );
		case InventoryActionTypes.modify: return inventoryAdapter.modify( state, action.item );
		case InventoryActionTypes.modified: return inventoryAdapter.modified( state, action.item );
		case InventoryActionTypes.remove: return inventoryAdapter.remove( state, action.key );
		case InventoryActionTypes.removed: return inventoryAdapter.removed( state, action.item );
		case InventoryActionTypes.removeFailed: return inventoryAdapter.removeFailed( state );
		default: return state;
	}
}