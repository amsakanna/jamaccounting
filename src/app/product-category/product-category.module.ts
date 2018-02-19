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
	MatListModule,
	MatExpansionModule
} from '@angular/material';
/*  3rd Party Modules  */
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
/*  My Library Modules  */
import { JamBounceSpinnerModule, JamFacebookSpinnerModule } from './../../jam/ui-library';
/*  App Modules  */
import { FormDialogModule, ExplorerModule } from '../ui';
/*  App Components  */
import { productCategoryRoutes } from './product-category.routes';
import { productCategoryReducer } from './product-category.store';
import { ProductCategoryEffects } from './product-category.effects';
import { ProductCategoryService } from './product-category.service';
import { ProductCategoryComponent } from './product-category.component';
import { ProductCategoryDetailComponent } from './product-category-detail.component';
import { ProductCategoryFormComponent } from './product-category-form.component';

@NgModule( {
	declarations: [
		ProductCategoryComponent,
		ProductCategoryDetailComponent,
		ProductCategoryFormComponent
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
		MatExpansionModule,
		StoreModule.forFeature( 'productCategoryState', productCategoryReducer ),
		EffectsModule.forFeature( [ ProductCategoryEffects ] ),
		JamBounceSpinnerModule,
		JamFacebookSpinnerModule,
		RouterModule.forChild( productCategoryRoutes ),
		FormDialogModule,
		ExplorerModule
	],
	entryComponents: [ ProductCategoryFormComponent ],
	providers: [ ProductCategoryService ]
} )
export class ProductCategoryModule { }
