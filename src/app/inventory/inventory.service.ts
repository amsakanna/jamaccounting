import { Injectable } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { buildModelFromForm, concatUniqueKeys } from "../../jam/functions";
import { Store } from "@ngrx/store";
import { JamEntityService } from "../../jam/ngrx";
import { InventoryModuleState, InventoryState, inventoryActions } from "./inventory.store";
import { Inventory, SupplyTypes, TaxGroup } from "../model";
import { moduleName } from './inventory.config';
import { KeyValue } from "../../jam/model-library";
import { NavigatorAction } from "../../jam/navigator";

@Injectable()
export class InventoryService extends JamEntityService<Inventory, InventoryState>
{
	public get moduleName (): string { return moduleName }
	public masterNames: KeyValue[];
	public selectedMasterName: KeyValue;
	public taxGroupList: TaxGroup[];
	public supplyTypes: string[];

	constructor (
		public rootStore: Store<InventoryModuleState>,
		public formBuilder: FormBuilder
	)
	{
		/**
		 * Initialize service
		 */
		super( rootStore.select( state => state.inventoryState ), inventoryActions );
		this.subscribeProperties( 'list', 'form', 'selectedItem', 'formItem', 'processing', 'loading', 'editing', 'adding', 'modifying' );

		/**
		 * Store Select
		 */
		this.rootStore.select( state => state.companyState.selectedItem )
			.filter( company => !!company )
			.subscribe( company => this.store.dispatch( inventoryActions.Initialize() ) );
		this.rootStore.select( state => state.companyState.masterNames )
			.subscribe( masterNames =>
			{
				this.masterNames = masterNames;
				this.selectedMasterName = this.masterNames.find( name => name.key === 'Inventory' );
			} );
		this.store.select( 'taxGroupList' ).subscribe( taxGroupList => this.taxGroupList = taxGroupList );

		this.supplyTypes = Object.keys( SupplyTypes );

	}

	/**
	 * Overrides
	 */
	private tabChange ( selectedTab: KeyValue ): void
	{
		this.rootStore.dispatch( new NavigatorAction.Navigate( selectedTab.value ) );
	}

}
