import { CompanyModuleState } from '../company';
import { JamEntityState, JamEntityActions, JamEntityAdapter } from "../../jam/ngrx";
import { Product, ProductCategory, Brand } from "../model";
import { actionPrefix, additionalStates } from "./product.config";

export interface ProductModuleState extends CompanyModuleState { productState: ProductState }
export interface ProductState extends JamEntityState<Product>
{
	categoryList: ProductCategory[];
	brandList: Brand[];
}
export const productActions = new JamEntityActions<Product>( actionPrefix );
export const productAdapter = new JamEntityAdapter<Product, ProductState>( productActions, additionalStates );
export const productReducer = productAdapter.reducer;
