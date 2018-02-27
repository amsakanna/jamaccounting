import { CompanyModuleState } from '../company';
import { JamEntityState, JamEntityActions, JamEntityAdapter } from "../../jam/ngrx";
import { Tax, TaxType } from "../model";
import { actionPrefix, additionalStates } from "./tax.config";

export interface TaxModuleState extends CompanyModuleState { taxState: TaxState }
export interface TaxState extends JamEntityState<Tax> { taxTypeList: TaxType[]; }
export const taxActions = new JamEntityActions<Tax>( actionPrefix );
export const taxAdapter = new JamEntityAdapter<Tax, TaxState>( taxActions, additionalStates );
export const taxReducer = taxAdapter.reducer;
