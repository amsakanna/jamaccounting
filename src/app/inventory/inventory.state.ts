import { JamEntityState } from '../../jam/ngrx';
import { CompanyModuleState } from '../company';
import { Inventory, Product, ProductCategory, Tax } from '../model';

export interface InventoryModuleState extends CompanyModuleState
{
	inventoryState: InventoryState
}

export interface InventoryState extends JamEntityState<Inventory>
{
	selectedItemProduct: Product;
	selectedItemCategory: ProductCategory;
	taxList: Tax[];
}