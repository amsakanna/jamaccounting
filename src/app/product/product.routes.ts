import { Routes } from "@angular/router";
import { ProductComponent } from "./product.component";
import { ProductFormComponent } from "./product-form.component";
import { ProductDetailComponent } from "./product-detail.component";

export const productRoutes: Routes = [
	{
		path: '', component: ProductComponent, children: [
			{ path: '@create', component: ProductFormComponent },
			{ path: ':product', component: ProductDetailComponent },
			{ path: ':product/edit', component: ProductFormComponent },
		]
	}
]
