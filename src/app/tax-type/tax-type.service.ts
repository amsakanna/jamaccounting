import { Injectable } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { buildModelFromForm, concatUniqueKeys } from "../../jam/functions";
import { Store } from "@ngrx/store";
import { JamEntityService } from "../../jam/ngrx";
import { TaxTypeModuleState, TaxTypeState, taxTypeActions } from "./tax-type.store";
import { TaxType } from "../model";
import { moduleName } from './tax-type.config';
import { KeyValue } from "../../jam/model-library";
import { NavigatorAction } from "../../jam/navigator";

@Injectable()
export class TaxTypeService extends JamEntityService<TaxType, TaxTypeState>
{
	public get moduleName (): string { return moduleName }
	public masterNames: KeyValue[];
	public selectedMasterName: KeyValue;
	public taxTypeList: TaxType[];

	constructor (
		public rootStore: Store<TaxTypeModuleState>,
		public formBuilder: FormBuilder
	)
	{
		/**
		 * Initialize service
		 */

		super( rootStore.select( state => state.taxTypeState ), taxTypeActions );
		this.subscribeProperties( 'list', 'form', 'selectedItem', 'formItem', 'processing', 'loading', 'editing', 'adding', 'modifying' );

		/**
		 * Store Select
		 */

		this.rootStore.select( state => state.companyState.selectedItem )
			.filter( company => !!company )
			.subscribe( company => this.store.dispatch( taxTypeActions.Initialize() ) );
		this.rootStore.select( state => state.companyState.masterNames )
			.subscribe( masterNames =>
			{
				this.masterNames = masterNames;
				this.selectedMasterName = this.masterNames.find( name => name.key == 'Tax Type' );
			} );

	}

	/**
	 * Overrides
	 */

	private tabChange ( selectedTab: KeyValue ): void
	{
		this.rootStore.dispatch( new NavigatorAction.Navigate( selectedTab.value ) );
	}

}
