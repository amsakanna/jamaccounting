import { JamEntityAction, JamEntityActions } from "../../jam/ngrx";
import { Product, ProductCategory, Brand } from "../model";

export const productActions = new JamEntityActions<Product>( '[Product]' );

export interface ProductAction extends JamEntityAction<Product> { }