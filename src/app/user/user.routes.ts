import { Routes } from "@angular/router/src/config";
import { UserGuard } from "./user.guard";
import { UserComponent } from "./user.component";
import { ProfileComponent } from "./profile.component";
import { SubscriptionComponent } from "./subscription.component";
import { CompaniesComponent } from './companies.component';

export const userRoutes: Routes = [
	{ path: '', redirectTo: 'companies', pathMatch: 'full' },
	{ path: 'profile', component: ProfileComponent },
	{ path: 'subscription', component: SubscriptionComponent },
	{ path: 'companies', component: CompaniesComponent }
]
