import { CompanyModuleState } from '../company';
import { JamEntityState, JamEntityAction, JamEntityActions, JamEntityAdapter, jamEntityReducer } from "../../jam/ngrx";
import { ProductCategory } from "../model";
import { config } from "./product-category.config";

export interface ProductCategoryModuleState extends CompanyModuleState
{
	productCategoryState: ProductCategoryState
}

export interface ProductCategoryState extends JamEntityState<ProductCategory> { }

export const productCategoryAdapter = new JamEntityAdapter<ProductCategory, ProductCategoryState>( config.actionPrefix, config.additionalStates );
export const productCategoryActions = productCategoryAdapter.actions;
export const productCategoryReducer = productCategoryAdapter.reducer;
