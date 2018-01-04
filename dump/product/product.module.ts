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
import { JamBounceSpinnerModule } from './../../jam/ui-library';

/*  App Modules  */
import { productRoutes } from './product.routes';
import { productReducers } from './product.reducers';
import { ProductEffects } from './product.effects';
import { ProductService } from './product.service';
import { ProductComponent } from './product.component';
import { ProductDetailComponent } from './product-detail.component';
import { ProductFormComponent } from './product-form.component';

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
		StoreModule.forFeature( 'productState', productReducers ),
		EffectsModule.forFeature( [ ProductEffects ] ),
		JamBounceSpinnerModule,
		RouterModule.forChild( productRoutes )
	],
	providers: [ ProductService ]
} )
export class ProductModule { }