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
	MatStepperModule,
	MatDatepickerModule,
	MatNativeDateModule,
	MatTooltipModule,
	MatFormFieldModule
} from '@angular/material';

/*  3rd Party Modules  */
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

/*  My Library Modules  */
import { JamBounceSpinnerModule } from '../../jam/ui-library';

/*  App Components  */
import { companyRoutes } from './company.routes';
import { CompanyGuard } from './company.guard';
import { companyReducers, CompanyEffects } from './company.store';
import { CompanyComponent } from './company.component';
import { CompanyFormComponent } from './company-form.component';

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
		MatSelectModule,
		MatOptionModule,
		MatStepperModule,
		MatDatepickerModule,
		MatNativeDateModule,
		MatTooltipModule,
		MatFormFieldModule,
		JamBounceSpinnerModule,
		StoreModule.forFeature( 'companyState', companyReducers ),
		EffectsModule.forFeature( [ CompanyEffects ] ),
		RouterModule.forChild( companyRoutes )
	],
	providers: [ CompanyGuard ]
} )
export class CompanyModule { }