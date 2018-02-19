import { JamEntityAdapter, jamEntityReducer, JamEntityActions, JamEntityAction } from '../../jam/ngrx';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TaxState } from './tax.state';
import { TaxAction, taxActions } from './tax.action';
import { Tax } from '../model';

const taxAdapter = new JamEntityAdapter<Tax, TaxState>();
const initialState = taxAdapter.getInitialState( {
	emptyItem: {
		key: null,
		name: '',
		typeKey: null,
		taxability: 'Undefined',
		rate: null
	},
	form: new FormGroup( {
		name: new FormControl( '', Validators.required ),
		rate: new FormControl( 0 ),
	} ),
	taxTypeList: [],
	selectedItemType: null
} );

export function taxReducers ( state = initialState, action: TaxAction ): TaxState
{
	switch ( action.type ) {
		case taxActions.initialized:
			return taxAdapter.initialized( state, action.list, action.defaultItem, action.extras );

		case taxActions.selected:
			const selectedItemType = state.taxTypeList.find( item => item.key == action.item.typeKey ) || null;
			console.log( action.item.key, selectedItemType )
			return taxAdapter.selected( state, action.item, { selectedItemType: selectedItemType } );

		default:
			return jamEntityReducer( state, action, taxActions, taxAdapter );
	}
}
