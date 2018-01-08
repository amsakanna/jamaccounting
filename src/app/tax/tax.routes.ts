import { Routes } from "@angular/router";
import { TaxComponent } from "./tax.component";
import { TaxFormComponent } from "./tax-form.component";
import { TaxDetailComponent } from "./tax-detail.component";

export const taxRoutes: Routes = [
	{
		path: '', component: TaxComponent, children: [
			{ path: '@create', component: TaxFormComponent },
			{ path: ':tax', component: TaxDetailComponent },
			{ path: ':tax/edit', component: TaxFormComponent },
		]
	}
]
