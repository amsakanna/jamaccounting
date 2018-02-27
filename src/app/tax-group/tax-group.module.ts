/*  Framework Modules  */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
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
import { taxGroupRoutes } from './tax-group.routes';
import { taxGroupReducer } from './tax-group.store';
import { TaxGroupEffects } from './tax-group.effects';
import { TaxGroupService } from './tax-group.service';
import { TaxGroupComponent } from './tax-group.component';
import { TaxGroupDetailComponent } from './tax-group-detail.component';
import { TaxGroupFormComponent } from './tax-group-form.component';

@NgModule( {
	declarations: [
		TaxGroupComponent,
		TaxGroupDetailComponent,
		TaxGroupFormComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		MatIconModule,
		MatButtonModule,
		MatInputModule,
		MatSelectModule,
		MatOptionModule,
		MatTooltipModule,
		MatDialogModule,
		MatListModule,
		StoreModule.forFeature( 'taxGroupState', taxGroupReducer ),
		EffectsModule.forFeature( [ TaxGroupEffects ] ),
		JamBounceSpinnerModule,
		JamFacebookSpinnerModule,
		RouterModule.forChild( taxGroupRoutes ),
		FormDialogModule,
		ExplorerModule
	],
	entryComponents: [ TaxGroupFormComponent ],
	providers: [ TaxGroupService ]
} )
export class TaxGroupModule { }
