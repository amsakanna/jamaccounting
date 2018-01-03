import { Data, Picture, } from "../../jam/model-library";
import { ProductFeature } from "./product-feature.model";

export interface Product extends Data
{
	sku: string;
	name: string;
	categoryKey: string;
	brandKey: string;
	color: string;
	pictures: Picture[];
	features: ProductFeature;
}
