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
import { productRoutes } from './voucher-type.routes';
import { productReducer } from './voucher-type.store';
import { ProductEffects } from './voucher-type.effects';
import { ProductService } from './voucher-type.service';
import { ProductComponent } from './voucher-type.component';
import { ProductDetailComponent } from './voucher-type-detail.component';
import { ProductFormComponent } from './voucher-type-form.component';

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
		RouterModule.forChild( productRoutes )
	],
	providers: [ ProductService ]
} )
export class ProductModule { }
