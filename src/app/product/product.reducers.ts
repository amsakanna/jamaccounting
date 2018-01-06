import { JamEntityAdapter, jamEntityReducer, JamEntityActions, JamEntityAction } from '../../jam/ngrx';
import { ProductState } from './product.state';
import { ProductAction, productActions } from './product.action';
import { Product, ProductCategory } from '../model';
import { Validators } from '@angular/forms';

const productAdapter = new JamEntityAdapter<Product, ProductState>();
const initialState = productAdapter.getInitialState( { categoryList: [], selectedItemCategory: null } );

export function productReducers ( state = initialState, action: ProductAction ): ProductState
{
	switch ( action.type ) {
		case productActions.initialized:
			const emptyItem: Product = {
				key: null,
				sku: '',
				name: '',
				categoryKey: null,
				brandKey: null,
				color: null,
				pictures: [],
				features: []
			};
			const formElements = {
				name: [ '', Validators.required ],
				sku: [ '' ]
			};
			return { ...productAdapter.initialized( state, action.list, action.defaultItem, emptyItem, formElements ), categoryList: action.categoryList };

		case productActions.selected:
			return { ...productAdapter.selected( state, action.item ), selectedItemCategory: action.selectedItemCategory };

		default:
			return jamEntityReducer( state, action, productActions, productAdapter );
	}
}