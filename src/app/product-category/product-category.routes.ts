import { Routes } from "@angular/router";
import { ProductCategoryComponent } from "./product-category.component";
import { ProductCategoryFormComponent } from "./product-category-form.component";
import { ProductCategoryDetailComponent } from "./product-category-detail.component";

export const productCategoryRoutes: Routes = [
	{
		path: '', component: ProductCategoryComponent, children: [
			{ path: '@create', component: ProductCategoryFormComponent },
			{ path: ':product-category', component: ProductCategoryDetailComponent },
			{ path: ':product-category/edit', component: ProductCategoryFormComponent },
		]
	}
]
