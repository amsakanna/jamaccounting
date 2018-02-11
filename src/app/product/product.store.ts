import { CompanyModuleState } from '../company';
import { JamEntityState, JamEntityAction, JamEntityActions, JamEntityAdapter, jamEntityReducer } from "../../jam/ngrx";
import { Product, ProductCategory, Brand } from "../model";
import { actionPrefix, additionalStates } from "./product.config";

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

class ProductAdapter extends JamEntityAdapter<Product, ProductState>
{
	public select ( state: ProductState, key: string ): ProductState
	{
		const newState = super.select( state, key );
		const selectedItemCategory = state.categoryList.find( item => item.key == newState.selectedItem.categoryKey );
		const selectedItemBrand = state.brandList.find( item => item.key == newState.selectedItem.brandKey );
		return this.newState( newState, { selectedItemCategory, selectedItemBrand } );
	}
}

export const productActions = new JamEntityActions<Product>( actionPrefix );
export const productAdapter = new ProductAdapter( productActions, additionalStates );
export const productReducer = productAdapter.reducer;
