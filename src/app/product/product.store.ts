import { CompanyModuleState } from '../company';
import { JamEntityState, JamEntityAction, JamEntityActions, JamEntityAdapter, jamEntityReducer } from "../../jam/ngrx";
import { Product, ProductCategory, Brand } from "../model";
import { config } from "./product.config";

export interface ProductModuleState extends CompanyModuleState
{
	productState: ProductState
}

export interface ProductState extends JamEntityState<Product>
{
	categoryList: ProductCategory[];
	selectedItemCategory: ProductCategory;
	brandList: Brand[];
	selectedItemBrand: Brand;
}

export const productAdapter = new JamEntityAdapter<Product, ProductState>( config.actionPrefix, config.additionalStates );
export const productActions = productAdapter.actions;
export const productReducer = productAdapter.reducer;
