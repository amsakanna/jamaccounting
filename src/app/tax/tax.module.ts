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
	MatTooltipModule,
	MatDialogModule,
	MatListModule
} from '@angular/material';
/*  3rd Party Modules  */
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
/*  My Library Modules  */
import { JamBounceSpinnerModule, JamFacebookSpinnerModule } from './../../jam/ui-library';
/*  App Modules  */
import { FormDialogModule, ExplorerModule } from '../ui';
/*  App Components  */
import { taxRoutes } from './tax.routes';
import { taxReducer } from './tax.store';
import { TaxEffects } from './tax.effects';
import { TaxService } from './tax.service';
import { TaxComponent } from './tax.component';
import { TaxDetailComponent } from './tax-detail.component';
import { TaxFormComponent } from './tax-form.component';

@NgModule( {
	declarations: [
		TaxComponent,
		TaxDetailComponent,
		TaxFormComponent
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
		MatDialogModule,
		MatListModule,
		StoreModule.forFeature( 'taxState', taxReducer ),
		EffectsModule.forFeature( [ TaxEffects ] ),
		JamBounceSpinnerModule,
		JamFacebookSpinnerModule,
		RouterModule.forChild( taxRoutes ),
		FormDialogModule,
		ExplorerModule
	],
	entryComponents: [ TaxFormComponent ],
	providers: [ TaxService ]
} )
export class TaxModule { }
