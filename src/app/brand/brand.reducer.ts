import { JamEntityAdapter, jamEntityReducer, JamEntityActions, JamEntityAction } from '../../jam/ngrx';
import { FormControl, Validators } from '@angular/forms';
import { BrandState } from './brand.state';
import { BrandAction, brandActions } from './brand.action';
import { Brand } from '../model';

const taxAdapter = new JamEntityAdapter<Brand, BrandState>();
const initialState = taxAdapter.getInitialState( { categoryList: [], selectedItemCategory: null } );

export function brandReducer ( state = initialState, action: BrandAction ): BrandState
{
	switch ( action.type ) {
		case brandActions.initialized:
			const emptyItem: Brand = {
				key: null,
				name: '',
				id: '',
				logo: null
			};
			const formElements = {
				name: new FormControl( '', Validators.required )
			};
			return taxAdapter.initialized( state, action.list, action.defaultItem, emptyItem, formElements );

		case brandActions.selected:
			return taxAdapter.selected( state, action.item );

		default:
			return jamEntityReducer( state, action, brandActions, taxAdapter );
	}
}