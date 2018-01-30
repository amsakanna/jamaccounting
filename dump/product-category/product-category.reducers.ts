import { ProductCategoryActionTypes, ProductCategoryAction } from './product-category.actions';
import { JamEntityAdapter } from '../../jam/ngrx';
import { ProductCategoryState } from './product-category.state';
import { ProductCategory } from '../model';

const productCategoryAdapter = new JamEntityAdapter<ProductCategory, ProductCategoryState>();
const initialState = productCategoryAdapter.getInitialState();

export function productCategoryReducers ( state = initialState, action: ProductCategoryAction.All ): ProductCategoryState
{
	switch ( action.type ) {
		case ProductCategoryActionTypes.initialize: return productCategoryAdapter.initialize( state );
		case ProductCategoryActionTypes.initialized: return productCategoryAdapter.initialized( state, action.list );
		case ProductCategoryActionTypes.select: return productCategoryAdapter.select( state, action.key );
		case ProductCategoryActionTypes.selected: return productCategoryAdapter.selected( state, action.item );
		case ProductCategoryActionTypes.selectFailed: return productCategoryAdapter.selectFailed( state );
		case ProductCategoryActionTypes.create: return productCategoryAdapter.create( state );
		case ProductCategoryActionTypes.cancelCreate: return productCategoryAdapter.cancelCreate( state );
		case ProductCategoryActionTypes.add: return productCategoryAdapter.add( state, action.item );
		case ProductCategoryActionTypes.added: return productCategoryAdapter.added( state, action.item );
		case ProductCategoryActionTypes.edit: return productCategoryAdapter.edit( state, action.item );
		case ProductCategoryActionTypes.cancelEdit: return productCategoryAdapter.cancelEdit( state );
		case ProductCategoryActionTypes.modify: return productCategoryAdapter.modify( state, action.item );
		case ProductCategoryActionTypes.modified: return productCategoryAdapter.modified( state, action.item );
		case ProductCategoryActionTypes.remove: return productCategoryAdapter.remove( state, action.key );
		case ProductCategoryActionTypes.removed: return productCategoryAdapter.removed( state, action.item );
		case ProductCategoryActionTypes.removeFailed: return productCategoryAdapter.removeFailed( state );
		default: return state;
	}
}