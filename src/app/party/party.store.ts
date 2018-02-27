import { CompanyModuleState } from '../company';
import { JamEntityState, JamEntityActions, JamEntityAdapter } from "../../jam/ngrx";
import { Party } from "../model";
import { actionPrefix, additionalStates } from "./party.config";

export interface PartyModuleState extends CompanyModuleState { partyState: PartyState }
export interface PartyState extends JamEntityState<Party> { }
export const partyActions = new JamEntityActions<Party>( actionPrefix );
export const partyAdapter = new JamEntityAdapter<Party, PartyState>( partyActions, additionalStates );
export const partyReducer = partyAdapter.reducer;
