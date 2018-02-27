import { CompanyModuleState } from '../company';
import { JamEntityState, JamEntityActions, JamEntityAdapter } from "../../jam/ngrx";
import { TaxGroup, Tax } from "../model";
import { actionPrefix, additionalStates } from "./tax-group.config";

export interface TaxGroupModuleState extends CompanyModuleState { taxGroupState: TaxGroupState }
export interface TaxGroupState extends JamEntityState<TaxGroup> { taxList: Tax[]; }
export const taxGroupActions = new JamEntityActions<TaxGroup>( actionPrefix );
export const taxGroupAdapter = new JamEntityAdapter<TaxGroup, TaxGroupState>( taxGroupActions, additionalStates );
export const taxGroupReducer = taxGroupAdapter.reducer;
