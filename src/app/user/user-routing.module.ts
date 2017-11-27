import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { Routes } from "@angular/router/src/config";
import { UserGuard } from "./user-guard.service";
import { UserComponent } from "./user.component";
import { ProfileComponent } from "./profile.component";
import { SubscriptionComponent } from "./subscription.component";

const routes: Routes = [
	{
		path: '', component: UserComponent, canActivate: [ UserGuard ], children: [
			{ path: '', component: ProfileComponent },
			{ path: 'profile', component: ProfileComponent },
			{ path: 'subscription', component: SubscriptionComponent },
			{ path: 'companies', component: ProfileComponent }
		]
	},
]

@NgModule( {
	imports: [ RouterModule.forChild( routes ) ],
	exports: [ RouterModule ]
} )
export class UserRoutingModule { }