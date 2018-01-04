import { ProductActionTypes, ProductAction } from './product.actions';
import { JamEntityAdapter } from '../../jam/ngrx';
import { ProductState } from './product.state';
import { Product } from '../model';

const productAdapter = new JamEntityAdapter<Product, ProductState>();
const initialState = productAdapter.getInitialState();

export function productReducers ( state = initialState, action: ProductAction.All ): ProductState
{
	switch ( action.type ) {
		case ProductActionTypes.initialize: return productAdapter.initialize( state );
		case ProductActionTypes.initialized: return { ...productAdapter.initialized( state, action.list, null ), categoryList: action.categoryList };
		case ProductActionTypes.select: return productAdapter.select( state, action.key );
		case ProductActionTypes.selected: return { ...productAdapter.selected( state, action.item ), selectedItemCategory: action.category };
		case ProductActionTypes.selectFailed: return productAdapter.selectFailed( state );
		case ProductActionTypes.create: return productAdapter.create( state );
		case ProductActionTypes.cancelCreate: return productAdapter.cancelCreate( state );
		case ProductActionTypes.add: return productAdapter.add( state, action.item );
		case ProductActionTypes.added: return productAdapter.added( state, action.item );
		case ProductActionTypes.edit: return productAdapter.edit( state, action.item );
		case ProductActionTypes.cancelEdit: return productAdapter.cancelEdit( state );
		case ProductActionTypes.modify: return productAdapter.modify( state, action.item );
		case ProductActionTypes.modified: return productAdapter.modified( state, action.item );
		case ProductActionTypes.remove: return productAdapter.remove( state, action.key );
		case ProductActionTypes.removed: return productAdapter.removed( state, action.item );
		case ProductActionTypes.removeFailed: return productAdapter.removeFailed( state );
		default: return state;
	}
}