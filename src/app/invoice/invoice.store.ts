import { CompanyModuleState } from '../company';
import { JamEntityState, JamEntityActions, JamEntityAdapter, JamEntityAction } from "../../jam/ngrx";
import { Invoice, Party, Inventory, TaxGroup, Tax, TaxType } from "../model";
import { actionPrefix, additionalStates } from "./invoice.config";

export interface InvoiceModuleState extends CompanyModuleState { invoiceState: InvoiceState }
export interface InvoiceState extends JamEntityState<Invoice>
{
	taxList: Tax[],
	taxGroupList: TaxGroup[],
	taxTypeList: TaxType[],
	partyList: Party[],
	inventoryList: Inventory[]
}
export class InvoiceActions extends JamEntityActions<Invoice>
{
	public get filterParties (): string { return this.actionPrefix + this.ifs + 'filter parties' };
	public get filterProducts (): string { return this.actionPrefix + this.ifs + 'filter products' };
	public get filteredParties (): string { return this.actionPrefix + this.ifs + 'filtered parties' };
	public get filteredProducts (): string { return this.actionPrefix + this.ifs + 'filtered products' };

	public FilterParties ( key: string ): JamEntityAction<Party> { return { type: this.filterParties, fnName: 'filterParties', key: key }; }
	public FilterProducts ( key: string ): JamEntityAction<Inventory> { return { type: this.filterProducts, fnName: 'filterProducts', key: key }; }
	public FilteredParties ( list: Party[] ): JamEntityAction<Party> { return { type: this.filteredParties, fnName: 'filteredParties', list: list }; }
	public FilteredProducts ( list: Inventory[] ): JamEntityAction<Inventory> { return { type: this.filteredProducts, fnName: 'filteredProducts', list: list }; }
}
export class InvoiceAdapter extends JamEntityAdapter<Invoice, InvoiceState, JamEntityAction<Invoice>, InvoiceActions>
{
	public filterParties ( state: InvoiceState ): InvoiceState
	{
		return this.newState( state, { loading: true, processing: true } );
	}
	public filteredParties ( state: InvoiceState, action: JamEntityAction<Party> ): InvoiceState
	{
		console.log( 'filtered Parties adapter function' );
		return this.newState( state, {
			loading: false,
			processing: false,
			partyList: action.list,
		} );
	}
	public filterProducts ( state: InvoiceState ): InvoiceState
	{
		return this.newState( state, { loading: true, processing: true } );
	}
	public filteredProducts ( state: InvoiceState, action: JamEntityAction<Inventory> ): InvoiceState
	{
		return this.newState( state, {
			loading: false,
			processing: false,
			inventoryList: action.list,
		} );
	}
}
export const invoiceActions = new InvoiceActions( actionPrefix );
export const invoiceAdapter = new InvoiceAdapter( invoiceActions, additionalStates );
export const invoiceReducer = invoiceAdapter.reducer;
