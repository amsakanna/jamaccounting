/*  Framework Modules  */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import
{
	MatIconModule,
	MatButtonModule,
	MatInputModule,
	MatSelectModule,
	MatOptionModule,
	MatTooltipModule
} from '@angular/material';

/*  3rd Party Modules  */
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

/*  My Library Modules  */
import { JamListModule } from '../../jam/ui-library';

/*  Components  */
import { userRoutes } from './user.routes';
import { UserGuard } from './user.guard';
import { userReducers, UserEffects } from './user.store';
import { UserComponent } from './user.component';
import { ProfileComponent } from './profile.component';
import { SubscriptionComponent } from './subscription.component';
import { CompaniesComponent } from './companies.component';

@NgModule( {
	declarations: [
		UserComponent,
		ProfileComponent,
		SubscriptionComponent,
		CompaniesComponent
	],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		MatIconModule,
		MatButtonModule,
		MatInputModule,
		MatSelectModule,
		MatOptionModule,
		MatTooltipModule,
		StoreModule.forFeature( 'userState', userReducers ),
		EffectsModule.forFeature( [ UserEffects ] ),
		JamListModule,
		RouterModule.forChild( userRoutes )
	],
	providers: [ UserGuard ]
} )
export class UserModule { }