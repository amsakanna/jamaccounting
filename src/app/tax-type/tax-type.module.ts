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
import { taxTypeRoutes } from './tax-type.routes';
import { taxTypeReducer } from './tax-type.store';
import { TaxTypeEffects } from './tax-type.effects';
import { TaxTypeService } from './tax-type.service';
import { TaxTypeComponent } from './tax-type.component';
import { TaxTypeDetailComponent } from './tax-type-detail.component';
import { TaxTypeFormComponent } from './tax-type-form.component';

@NgModule( {
	declarations: [
		TaxTypeComponent,
		TaxTypeDetailComponent,
		TaxTypeFormComponent
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
		StoreModule.forFeature( 'taxTypeState', taxTypeReducer ),
		EffectsModule.forFeature( [ TaxTypeEffects ] ),
		JamBounceSpinnerModule,
		JamFacebookSpinnerModule,
		RouterModule.forChild( taxTypeRoutes ),
		FormDialogModule,
		ExplorerModule
	],
	entryComponents: [ TaxTypeFormComponent ],
	providers: [ TaxTypeService ]
} )
export class TaxTypeModule { }
