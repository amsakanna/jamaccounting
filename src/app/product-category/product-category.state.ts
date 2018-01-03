import { JamEntityState } from '../../jam/ngrx';
import { CompanyModuleState } from '../company';
import { ProductCategory } from '../model';

export interface ProductCategoryModuleState extends CompanyModuleState
{
	productCategoryState: ProductCategoryState
}

export interface ProductCategoryState extends JamEntityState<ProductCategory> { }