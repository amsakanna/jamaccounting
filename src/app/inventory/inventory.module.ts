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
/*  3rd Inventory Modules  */
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
/*  My Library Modules  */
import { JamBounceSpinnerModule, JamFacebookSpinnerModule } from './../../jam/ui-library';
/*  App Modules  */
import { FormDialogModule, ExplorerModule } from '../ui';
/*  App Components  */
import { inventoryRoutes } from './inventory.routes';
import { inventoryReducer } from './inventory.store';
import { InventoryEffects } from './inventory.effects';
import { InventoryService } from './inventory.service';
import { InventoryComponent } from './inventory.component';
import { InventoryDetailComponent } from './inventory-detail.component';
import { InventoryFormComponent } from './inventory-form.component';

@NgModule( {
	declarations: [
		InventoryComponent,
		InventoryDetailComponent,
		InventoryFormComponent
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
		StoreModule.forFeature( 'inventoryState', inventoryReducer ),
		EffectsModule.forFeature( [ InventoryEffects ] ),
		JamBounceSpinnerModule,
		JamFacebookSpinnerModule,
		RouterModule.forChild( inventoryRoutes ),
		FormDialogModule,
		ExplorerModule
	],
	entryComponents: [ InventoryFormComponent ],
	providers: [ InventoryService ]
} )
export class InventoryModule { }
