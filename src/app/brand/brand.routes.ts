import { Routes } from "@angular/router";
import { BrandComponent } from "./brand.component";
import { BrandFormComponent } from "./brand-form.component";
import { BrandDetailComponent } from "./brand-detail.component";

export const brandRoutes: Routes = [
	{
		path: '', component: BrandComponent, children: [
			{ path: '@create', component: BrandFormComponent },
			{ path: ':brand', component: BrandDetailComponent },
			{ path: ':brand/edit', component: BrandFormComponent },
		]
	}
]
