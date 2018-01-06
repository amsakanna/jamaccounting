import { JamEntityAction, JamEntityActions } from "../../jam/ngrx";
import { Product, ProductCategory } from "../model";

export const productActions = new JamEntityActions<Product>( '[Product]' );

export interface ProductAction extends JamEntityAction<Product>
{
	categoryList: ProductCategory[];
	selectedItemCategory: ProductCategory;
}