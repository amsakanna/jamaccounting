import { CompanyModuleState } from '../company';
import { JamEntityState, JamEntityActions, JamEntityAdapter } from "../../jam/ngrx";
import { Brand } from "../model";
import { actionPrefix, additionalStates } from "./brand.config";

export interface BrandModuleState extends CompanyModuleState { brandState: BrandState }
export interface BrandState extends JamEntityState<Brand> { }
export const brandActions = new JamEntityActions<Brand>( actionPrefix );
export const brandAdapter = new JamEntityAdapter<Brand, BrandState>( brandActions, additionalStates );
export const brandReducer = brandAdapter.reducer;
