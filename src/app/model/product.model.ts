import { Data, Picture, } from "../../jam/model-library";
import { ProductCategory } from "./product-category.model";
import { Brand } from "./brand.model";
import { ProductFeature } from "./product-feature.model";

export interface Product extends Data
{
	id?: string;
	name?: string;
	categoryKey?: string;
	category?: ProductCategory;
	brandKey?: string;
	brand?: Brand;
	quantity?: string;
	uom?: string;
	color?: string;
	pictures?: Picture[];
	features?: ProductFeature[];
}
