import { CompanyModuleState } from '../company';
import { JamEntityState, JamEntityAction, JamEntityActions, JamEntityAdapter, jamEntityReducer } from "../../jam/ngrx";
import { ProductCategory } from "../model";
import { actionPrefix, additionalStates } from "./product-category.config";

export interface ProductCategoryModuleState extends CompanyModuleState
{
	productCategoryState: ProductCategoryState
}

export interface ProductCategoryState extends JamEntityState<ProductCategory> { }

export const productCategoryActions = new JamEntityActions<ProductCategory>( actionPrefix );
export const productCategoryAdapter = new JamEntityAdapter<ProductCategory, ProductCategoryState>( productCategoryActions, additionalStates );
export const productCategoryReducer = productCategoryAdapter.reducer;
