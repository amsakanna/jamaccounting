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
import { brandRoutes } from './brand.routes';
import { brandReducer } from './brand.store';
import { BrandEffects } from './brand.effects';
import { BrandService } from './brand.service';
import { BrandComponent } from './brand.component';
import { BrandDetailComponent } from './brand-detail.component';
import { BrandFormComponent } from './brand-form.component';

@NgModule( {
	declarations: [
		BrandComponent,
		BrandDetailComponent,
		BrandFormComponent
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
		StoreModule.forFeature( 'brandState', brandReducer ),
		EffectsModule.forFeature( [ BrandEffects ] ),
		JamBounceSpinnerModule,
		JamFacebookSpinnerModule,
		RouterModule.forChild( brandRoutes ),
		FormDialogModule,
		ExplorerModule
	],
	entryComponents: [ BrandFormComponent ],
	providers: [ BrandService ]
} )
export class BrandModule { }
