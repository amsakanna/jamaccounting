import { ProductActionTypes, ProductAction } from './product.actions';
import { JamEntityAdapter, jamEntityReducer, JamEntityActions, JamEntityAction, JamEntityActionTypes } from '../../jam/ngrx';
import { ProductState } from './product.state';
import { Product, ProductCategory } from '../model';

const productAdapter = new JamEntityAdapter<Product, ProductState>();
const initialState = productAdapter.getInitialState();
var actions = new JamEntityActions( '[product]' );

interface ProductAction extends JamEntityAction<Product>
{
	categoryList: ProductCategory[];
	category: ProductCategory;
}

export function productReducers ( state = initialState, action: ProductAction ): ProductState
{
	switch ( action.type ) {
		case JamEntityActionTypes.initialized: return { ...productAdapter.initialized( state, action.list ), categoryList: action.categoryList };
		case JamEntityActionTypes.selected: return { ...productAdapter.selected( state, action.item ), selectedItemCategory: action.category };
		default: return jamEntityReducer( state, action, actions, productAdapter );
	}
}