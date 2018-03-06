import { CompanyModuleState } from '../company';
import { JamEntityState, JamEntityActions, JamEntityAdapter } from "../../jam/ngrx";
import { Invoice, Party, Inventory, TaxGroup } from "../model";
import { actionPrefix, additionalStates } from "./invoice.config";

export interface InvoiceModuleState extends CompanyModuleState { invoiceState: InvoiceState }
export interface InvoiceState extends JamEntityState<Invoice>
{
	partyList: Party[],
	inventoryList: Inventory[]
}
export const invoiceActions = new JamEntityActions<Invoice>( actionPrefix );
export const invoiceAdapter = new JamEntityAdapter<Invoice, InvoiceState>( invoiceActions, additionalStates );
export const invoiceReducer = invoiceAdapter.reducer;
