import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AccountComponent } from "./account.component";
import { AccountDetailComponent } from "./account-detail.component";
import { AccountFormComponent } from "./account-form.component";

const routes: Routes = [
	{
		path: '', component: AccountComponent, children: [
			{ path: '@create', component: AccountFormComponent },
			{ path: ':account', component: AccountDetailComponent },
			{ path: ':account/edit', component: AccountFormComponent }
		]
	}
];

@NgModule( {
	imports: [ RouterModule.forChild( routes ) ],
	exports: [ RouterModule ]
} )
export class AccountRoutingModule { }