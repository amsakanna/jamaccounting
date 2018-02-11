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
	MatSnackBarModule,
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
import { productRoutes } from './product.routes';
import { productReducer } from './product.store';
import { ProductEffects } from './product.effects';
import { ProductService } from './product.service';
import { ProductComponent } from './product.component';
import { ProductDetailComponent } from './product-detail.component';
import { ProductFormComponent } from './product-form.component';
import { FeatureModule } from '../../jam/model-library';

@NgModule( {
	declarations: [
		ProductComponent,
		ProductDetailComponent,
		ProductFormComponent
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
		MatSnackBarModule,
		MatListModule,
		StoreModule.forFeature( 'productState', productReducer ),
		EffectsModule.forFeature( [ ProductEffects ] ),
		JamBounceSpinnerModule,
		JamFacebookSpinnerModule,
		RouterModule.forChild( productRoutes ),
		FormDialogModule,
		ExplorerModule
	],
	entryComponents: [ ProductFormComponent ],
	providers: [ ProductService ]
} )
export class ProductModule { }
