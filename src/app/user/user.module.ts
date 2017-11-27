/*  Framework Modules  */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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

/*  App Components  */
import { userReducers } from './user.reducers';
import { UserEffects } from './user.effects';
import { UserComponent } from './user.component';
import { UserRoutingModule } from './user-routing.module';
import { UserGuard } from './user-guard.service';
import { ProfileComponent } from './profile.component';
import { SubscriptionComponent } from './subscription.component';

@NgModule( {
	declarations: [
		UserComponent,
		ProfileComponent,
		SubscriptionComponent
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
		UserRoutingModule
	],
	providers: [ UserGuard ]
} )
export class UserModule { }