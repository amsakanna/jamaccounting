import { JamEntityAdapter, jamEntityReducer, JamEntityActions, JamEntityAction } from '../../jam/ngrx';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BrandState } from './brand.state';
import { BrandAction, brandActions } from './brand.action';
import { Brand } from '../model';

const taxAdapter = new JamEntityAdapter<Brand, BrandState>();
const initialState = taxAdapter.getInitialState( {
	form: new FormGroup( {
		name: new FormControl( '', Validators.required )
	} )
} );

export function brandReducer ( state = initialState, action: BrandAction ): BrandState
{
	switch ( action.type ) {
		case brandActions.initialized:

			return taxAdapter.initialized( state, action.list, action.defaultItem );

		case brandActions.selected:
			return taxAdapter.selected( state, action.item );

		default:
			return jamEntityReducer( state, action, brandActions, taxAdapter );
	}
}
