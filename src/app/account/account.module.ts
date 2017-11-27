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

/*  My Library Modules  */
import { JamModelLibraryModule } from './../../jam-model-library/jam-model-library';
import { JamTreeModule, JamBounceSpinnerModule } from './../../jam-ui-library/jam-ui-library';

/*  App Modules  */
import { AccountRoutingModule } from './account-routing.module';
import { AccountFormComponent } from './account-form.component';
import { AccountDetailComponent } from './account-detail.component';
import { AccountComponent } from './account.component';
import { accountReducers } from './account.reducers';
import { AccountEffects } from './account.effects';

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
		JamModelLibraryModule,
		JamTreeModule,
		JamBounceSpinnerModule,
		AccountRoutingModule
	]
} )
export class AccountModule { }