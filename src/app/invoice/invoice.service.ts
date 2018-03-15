import { Injectable } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { buildModelFromForm, concatUniqueKeys } from "../../jam/functions";
import { Store } from "@ngrx/store";
import { JamEntityService } from "../../jam/ngrx";
import { InvoiceModuleState, InvoiceState, invoiceActions } from "./invoice.store";
import { Invoice, Party, Inventory } from "../model";
import { moduleName } from './invoice.config';
import { KeyValue } from "../../jam/model-library";
import { NavigatorAction } from "../../jam/navigator";

@Injectable()
export class InvoiceService extends JamEntityService<Invoice, InvoiceState>
{
	public get moduleName (): string { return moduleName }
	public masterNames: KeyValue[];
	public selectedMasterName: KeyValue;
	public invoiceList: Invoice[];
	public partyList: Party[];
	public inventoryList: Inventory[];

	constructor (
		public rootStore: Store<InvoiceModuleState>,
		public formBuilder: FormBuilder
	)
	{
		/**
		 * Initialize service
		 */
		super( rootStore.select( state => state.invoiceState ), invoiceActions );
		this.subscribeProperties( 'list', 'form', 'selectedItem', 'formItem', 'processing', 'loading', 'editing', 'adding', 'modifying' );

		/**
		 * Store Select
		 */
		this.rootStore.select( state => state.companyState.selectedItem )
			.filter( company => !!company )
			.subscribe( company => this.store.dispatch( invoiceActions.Initialize() ) );
		this.rootStore.select( state => state.companyState.masterNames )
			.subscribe( masterNames =>
			{
				this.masterNames = masterNames;
				this.selectedMasterName = this.masterNames.find( name => name.key === 'Invoice' );
			} );
		this.store.select( 'partyList' ).subscribe( partyList => this.partyList = partyList );
		this.store.select( 'inventoryList' ).subscribe( inventoryList => this.inventoryList = inventoryList );

	}

	/**
	 * Extension Methods
	 */
	private tabChange ( selectedTab: KeyValue ): void
	{
		this.rootStore.dispatch( new NavigatorAction.Navigate( selectedTab.value ) );
	}

	public create (): void
	{
		this.store.dispatch( invoiceActions.Create() );
	}

	public filterParties ( key: string ): void
	{
		this.store.dispatch( invoiceActions.FilterParties( key ) );
	}

	public filterProducts ( key: string ): void
	{
		this.store.dispatch( invoiceActions.FilterProducts( key ) );
	}

}
