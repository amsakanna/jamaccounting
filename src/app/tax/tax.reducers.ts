import { JamEntityAdapter, jamEntityReducer, JamEntityActions, JamEntityAction } from '../../jam/ngrx';
import { FormControl, Validators } from '@angular/forms';
import { TaxState } from './tax.state';
import { TaxAction, taxActions } from './tax.action';
import { Tax } from '../model';

const taxAdapter = new JamEntityAdapter<Tax, TaxState>();
const initialState = taxAdapter.getInitialState( { categoryList: [], selectedItemCategory: null } );

export function taxReducers ( state = initialState, action: TaxAction ): TaxState
{
	switch ( action.type ) {
		case taxActions.initialized:
			const emptyItem: Tax = {
				key: null,
				name: '',
				fullName: '',
				taxability: 'Undefined',
				rate: null,
				effectiveDate: new Date()
			};
			const formElements = {
				name: new FormControl( '', Validators.required ),
				fullName: new FormControl( '' ),
				rate: new FormControl( 0 ),
				effectiveDate: new FormControl( '' )
			};
			return taxAdapter.initialized( state, action.list, action.defaultItem, emptyItem, formElements );

		case taxActions.selected:
			return taxAdapter.selected( state, action.item );

		default:
			return jamEntityReducer( state, action, taxActions, taxAdapter );
	}
}