import { Routes } from "@angular/router";
import { AccountComponent } from "./account.component";
import { AccountDetailComponent } from "./account-detail.component";
import { AccountFormComponent } from "./account-form.component";

export const accountRoutes: Routes = [
	{
		path: '', component: AccountComponent, children: [
			{ path: '@create', component: AccountFormComponent },
			{ path: ':account', component: AccountDetailComponent },
			{ path: ':account/edit', component: AccountFormComponent }
		]
	}
];
