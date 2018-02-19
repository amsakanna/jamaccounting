import { Data, Picture } from "../../jam/model-library";
import { ProductCategoryFeature } from './product-category-feature.model';

export interface ProductCategory extends Data
{
	name?: string;
	parentKey?: string;
	picture?: Picture;
	features?: ProductCategoryFeature[];
}
