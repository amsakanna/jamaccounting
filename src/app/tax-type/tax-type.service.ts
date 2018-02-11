import { Injectable } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { buildModelFromForm, concatUniqueKeys } from "../../jam/functions";
import { Store } from "@ngrx/store";
import { JamEntityService } from "../../jam/ngrx";
import { TaxTypeModuleState, TaxTypeState, taxTypeActions } from "./tax-type.store";
import { TaxType } from "../model";

@Injectable()
export class TaxTypeService extends JamEntityService<TaxType, TaxTypeState>
{

	public taxabilities: string[];

	constructor (
		public rootStore: Store<TaxTypeModuleState>,
		public store: Store<TaxTypeState>,
		public formBuilder: FormBuilder
	)
	{
		super( rootStore.select( state => state.taxTypeState ), taxTypeActions );
		this.subscribeProperties( 'list', 'form', 'selectedItem', 'formItem', 'loading', 'adding', 'modifying' );

		this.rootStore.select( state => state.companyState.selectedItem )
			.filter( company => !!company )
			.subscribe( company => this.store.dispatch( taxTypeActions.Initialize() ) );
	}

}
