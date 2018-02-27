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
	MatTooltipModule
} from '@angular/material';

/*  3rd Party Modules  */
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

/*  My Library Modules  */
import { JamBounceSpinnerModule, JamExplorerModule, JamTreeListModule } from './../../jam/ui-library';

/*  App Modules  */
import { inventoryRoutes } from './inventory.routes';
import { inventoryReducers, InventoryEffects } from './inventory.store';
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
		StoreModule.forFeature( 'inventoryState', inventoryReducers ),
		EffectsModule.forFeature( [ InventoryEffects ] ),
		JamBounceSpinnerModule,
		JamExplorerModule,
		JamTreeListModule,
		RouterModule.forChild( inventoryRoutes )
	],
	providers: [
		InventoryService
	]
} )
export class InventoryModule { }