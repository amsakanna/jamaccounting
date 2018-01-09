import { Injectable } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { buildModelFromForm, concatUniqueKeys } from "../../jam/functions";
import { Store } from "@ngrx/store";
import { JamEntityService } from "../../jam/ngrx";
import { TaxModuleState, TaxState, taxActions } from "./tax.store";
import { Tax, TaxType } from "../model";

@Injectable()
export class TaxService extends JamEntityService<Tax, TaxModuleState>
{

	public taxabilities: string[];
	public taxTypeList: TaxType[];
	public selectedItemType: TaxType;

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

		this.store.select( state => state.taxState.taxTypeList )
			.subscribe( taxTypeList => this.taxTypeList = taxTypeList );

		this.store.select( state => state.taxState.selectedItemType )
			.subscribe( selectedItemType => this.selectedItemType = selectedItemType );

		this.taxabilities = [ 'Undefined', 'Exempt', 'NilRated', 'Taxable' ];
	}

}