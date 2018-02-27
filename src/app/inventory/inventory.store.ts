import { CompanyModuleState } from '../company';
import { JamEntityState, JamEntityActions, JamEntityAdapter } from "../../jam/ngrx";
import { Inventory, TaxGroup } from "../model";
import { actionPrefix, additionalStates } from "./inventory.config";

export interface InventoryModuleState extends CompanyModuleState { inventoryState: InventoryState }
export interface InventoryState extends JamEntityState<Inventory> { taxGroupList: TaxGroup[]; }
export const inventoryActions = new JamEntityActions<Inventory>( actionPrefix );
export const inventoryAdapter = new JamEntityAdapter<Inventory, InventoryState>( inventoryActions, additionalStates );
export const inventoryReducer = inventoryAdapter.reducer;
