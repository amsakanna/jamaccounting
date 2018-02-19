import { CompanyModuleState } from '../company';
import { JamEntityState, JamEntityActions, JamEntityAdapter } from "../../jam/ngrx";
import { TaxType } from "../model";
import { actionPrefix, additionalStates } from "./tax-type.config";

export interface TaxTypeModuleState extends CompanyModuleState { taxTypeState: TaxTypeState }
export interface TaxTypeState extends JamEntityState<TaxType> { }
export const taxTypeActions = new JamEntityActions<TaxType>( actionPrefix );
export const taxTypeAdapter = new JamEntityAdapter<TaxType, TaxTypeState>( taxTypeActions, additionalStates );
export const taxTypeReducer = taxTypeAdapter.reducer;
