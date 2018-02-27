import { CompanyModuleState } from '../company';
import { JamEntityState, JamEntityActions, JamEntityAdapter } from "../../jam/ngrx";
import { Invoice } from "../model";
import { actionPrefix, additionalStates } from "./invoice.config";

export interface InvoiceModuleState extends CompanyModuleState { invoiceState: InvoiceState }
export interface InvoiceState extends JamEntityState<Invoice> { }
export const invoiceActions = new JamEntityActions<Invoice>( actionPrefix );
export const invoiceAdapter = new JamEntityAdapter<Invoice, InvoiceState>( invoiceActions, additionalStates );
export const invoiceReducer = invoiceAdapter.reducer;
