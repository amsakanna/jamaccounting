import { JamEntityState } from '../../jam/ngrx';
import { CompanyModuleState } from '../company';
import { Product, ProductCategory } from '../model';

export interface ProductModuleState extends CompanyModuleState
{
	productState: ProductState
}

export interface ProductState extends JamEntityState<Product>
{
	categoryList: ProductCategory[];
	selectedItemCategory: ProductCategory;
}