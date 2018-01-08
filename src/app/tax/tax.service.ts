import { Injectable } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { buildModelFromForm, concatUniqueKeys } from "../../jam/functions";
import { Store } from "@ngrx/store";
import { JamEntityService } from "../../jam/ngrx";
import { TaxModuleState, TaxState, taxActions } from "./tax.store";
import { Tax } from "../model";

@Injectable()
export class TaxService extends JamEntityService<Tax, TaxModuleState>
{

	public taxabilities: string[];

	constructor (
		public store: Store<TaxModuleState>,
		public formBuilder: FormBuilder
	)
	{
		super( 'taxState', taxActions );
		this.subscribeProperties( [ 'list', 'form', 'selectedItem', 'formItem', 'loading', 'adding', 'modifying' ] );

		this.store.select( state => state.companyState.selectedItem )
			.filter( company => !!company )
			.subscribe( company => this.store.dispatch( taxActions.Initialize() ) );

		this.taxabilities = [ 'Undefined', 'Exempt', 'NilRated', 'Taxable' ];
	}

}