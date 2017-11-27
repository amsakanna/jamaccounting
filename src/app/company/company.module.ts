/*  Framework Modules  */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import
{
	MatIconModule,
	MatButtonModule,
	MatInputModule,
	MatTooltipModule
} from '@angular/material';

/*  3rd Party Modules  */
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

/*  My Library Modules  */
import { JamModelLibraryModule } from './../../jam-model-library/jam-model-library';
import { JamBounceSpinnerModule } from './../../jam-ui-library/jam-ui-library';

/*  App Modules  */
import { CompanyRoutingModule } from './company-routing.module';
import { CompanyFormComponent } from './company-form.component';
import { CompanyComponent } from './company.component';
import { companyReducers } from './company.reducers';
import { CompanyEffects } from './company.effects';

@NgModule( {
	declarations: [
		CompanyComponent,
		CompanyFormComponent
	],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		MatIconModule,
		MatButtonModule,
		MatInputModule,
		MatTooltipModule,
		StoreModule.forFeature( 'companyState', companyReducers ),
		EffectsModule.forFeature( [ CompanyEffects ] ),
		JamModelLibraryModule,
		JamBounceSpinnerModule,
		CompanyRoutingModule
	]
} )
export class CompanyModule { }