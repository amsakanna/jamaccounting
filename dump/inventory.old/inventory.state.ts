import { JamEntityState } from '../../jam/ngrx';
import { CompanyModuleState } from '../company';
import { InventoryItem } from '../model';
import { FlatTree } from '../../jam/model-library';

export interface InventoryModuleState extends CompanyModuleState
{
	inventoryState: InventoryState
}

export interface InventoryState extends JamEntityState<InventoryItem>
{
	tree: FlatTree<InventoryItem>
}