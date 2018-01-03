/*  Framework Modules  */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
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
import { JamBounceSpinnerModule, JamTreeModule } from './../../jam/ui-library';

/*  App Modules  */
import { accountRoutes } from './account.routes';
import { accountReducers, AccountEffects } from './account.store';
import { AccountComponent } from './account.component';
import { AccountDetailComponent } from './account-detail.component';
import { AccountFormComponent } from './account-form.component';

@NgModule( {
	declarations: [
		AccountComponent,
		AccountDetailComponent,
		AccountFormComponent
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
		StoreModule.forFeature( 'accountState', accountReducers ),
		EffectsModule.forFeature( [ AccountEffects ] ),
		JamBounceSpinnerModule,
		JamTreeModule,
		RouterModule.forChild( accountRoutes )
	]
} )
export class AccountModule { }