import { Injectable } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatSelectionListChange } from "@angular/material";
import { buildModelFromForm, concatUniqueKeys } from "../../jam/functions";
import { Store } from "@ngrx/store";
import { JamEntityService } from "../../jam/ngrx";
import { TaxGroupModuleState, TaxGroupState, taxGroupActions } from "./tax-group.store";
import { TaxGroup, Tax } from "../model";
import { moduleName } from './tax-group.config';
import { KeyValue } from "../../jam/model-library";
import { NavigatorAction } from "../../jam/navigator";

@Injectable()
export class TaxGroupService extends JamEntityService<TaxGroup, TaxGroupState>
{
	public get moduleName (): string { return moduleName }
	public masterNames: KeyValue[];
	public selectedMasterName: KeyValue;
	public taxList: Tax[];
	public selectedTaxes: Tax[];

	constructor (
		public rootStore: Store<TaxGroupModuleState>,
		public formBuilder: FormBuilder
	)
	{
		/**
		 * Initialize service
		 */
		super( rootStore.select( state => state.taxGroupState ), taxGroupActions );
		this.subscribeProperties( 'list', 'form', 'selectedItem', 'formItem', 'processing', 'loading', 'editing', 'adding', 'modifying' );

		/**
		 * Store Select
		 */
		this.rootStore.select( state => state.companyState.selectedItem )
			.filter( company => !!company )
			.subscribe( company => this.store.dispatch( taxGroupActions.Initialize() ) );
		this.rootStore.select( state => state.companyState.masterNames )
			.subscribe( masterNames =>
			{
				this.masterNames = masterNames;
				this.selectedMasterName = this.masterNames.find( name => name.key === 'Tax Group' );
			} );
		this.store.select( 'taxList' )
			.subscribe( taxList => this.taxList = taxList );
		this.store.select( 'formItem' )
			.filter( formItem => !!this.taxList )
			.map( formItem => this.taxList.map( tax => ( { ...tax, selected$: formItem.taxesKey.includes( tax.key ) } ) as Tax ) )
			.subscribe( taxList => this.taxList = taxList );
	}

	/**
	 * Extension Methods
	 */
	public tabChange ( selectedTab: KeyValue ): void
	{
		this.rootStore.dispatch( new NavigatorAction.Navigate( selectedTab.value ) );
	}

}
