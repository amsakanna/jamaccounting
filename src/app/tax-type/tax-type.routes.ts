import { Routes } from "@angular/router";
import { TaxTypeComponent } from "./tax-type.component";
import { TaxTypeFormComponent } from "./tax-type-form.component";
import { TaxTypeDetailComponent } from "./tax-type-detail.component";

export const taxTypeRoutes: Routes = [
	{
		path: '', component: TaxTypeComponent, children: [
			{ path: '@create', component: TaxTypeFormComponent },
			{ path: ':tax-type', component: TaxTypeDetailComponent },
			{ path: ':tax-type/edit', component: TaxTypeFormComponent },
		]
	}
]
