import { Routes } from "@angular/router";
import { ProductComponent } from "./voucher-type.component";
import { ProductFormComponent } from "./voucher-type-form.component";
import { ProductDetailComponent } from "./voucher-type-detail.component";

export const productRoutes: Routes = [
	{
		path: '', component: ProductComponent, children: [
			{ path: '@create', component: ProductFormComponent },
			{ path: ':voucher-type', component: ProductDetailComponent },
			{ path: ':voucher-type/edit', component: ProductFormComponent },
		]
	}
]
