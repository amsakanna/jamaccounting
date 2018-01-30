import { JamEntityAdapter, jamEntityReducer, JamEntityActions, JamEntityAction } from '../../jam/ngrx';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TaxTypeState } from './tax-type.state';
import { TaxTypeAction, taxTypeActions } from './tax-type.action';
import { TaxType } from '../model';

const taxAdapter = new JamEntityAdapter<TaxType, TaxTypeState>();
const initialState = taxAdapter.getInitialState( {
	emptyItem: {
		key: null,
		name: '',
		fullName: ''
	},
	form: new FormGroup( {
		name: new FormControl( '', Validators.required ),
		fullName: new FormControl( '' )
	} )
} );

export function taxTypeReducers ( state = initialState, action: TaxTypeAction ): TaxTypeState
{
	switch ( action.type ) {
		case taxTypeActions.initialized:
			return taxAdapter.initialized( state, action.list, action.defaultItem );

		case taxTypeActions.selected:
			return taxAdapter.selected( state, action.item );

		default:
			return jamEntityReducer( state, action, taxTypeActions, taxAdapter );
	}
}
