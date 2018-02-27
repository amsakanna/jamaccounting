import { Injectable } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { buildModelFromForm, concatUniqueKeys } from "../../jam/functions";
import { Store } from "@ngrx/store";
import { JamEntityService } from "../../jam/ngrx";
import { TaxModuleState, TaxState, taxActions } from "./tax.store";
import { Tax, TaxType } from "../model";
import { moduleName } from './tax.config';
import { KeyValue } from "../../jam/model-library";
import { NavigatorAction } from "../../jam/navigator";
import { Taxabilities } from "../model/taxabilities.enum";

@Injectable()
export class TaxService extends JamEntityService<Tax, TaxState>
{
	public get moduleName (): string { return moduleName }
	public masterNames: KeyValue[];
	public selectedMasterName: KeyValue;
	public taxTypeList: TaxType[];
	public selectedItemType: TaxType;
	public taxabilities: string[];

	constructor (
		public rootStore: Store<TaxModuleState>,
		public formBuilder: FormBuilder
	)
	{
		/**
		 * Initialize service
		 */
		super( rootStore.select( state => state.taxState ), taxActions );
		this.subscribeProperties( 'list', 'form', 'selectedItem', 'formItem', 'processing', 'loading', 'editing', 'adding', 'modifying' );

		/**
		 * Store Select
		 */
		this.rootStore.select( state => state.companyState.selectedItem )
			.filter( company => !!company )
			.subscribe( company => this.store.dispatch( taxActions.Initialize() ) );
		this.rootStore.select( state => state.companyState.masterNames )
			.subscribe( masterNames =>
			{
				this.masterNames = masterNames;
				this.selectedMasterName = this.masterNames.find( name => name.key === 'Tax' );
			} );
		this.store.select( 'taxTypeList' )
			.subscribe( taxTypeList => this.taxTypeList = taxTypeList );

		this.taxabilities = Object.keys( Taxabilities );
	}

	/**
	 * Override Methods
	 */
	public submit ()
	{
		this.formItem.typeKey = this.formItem.type.key;
		super.submit();
	}

	/**
	 * Extension Methods
	 */
	public tabChange ( selectedTab: KeyValue ): void
	{
		this.rootStore.dispatch( new NavigatorAction.Navigate( selectedTab.value ) );
	}

}
