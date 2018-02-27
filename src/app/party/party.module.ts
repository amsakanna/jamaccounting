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
	MatRadioModule,
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
import { partyRoutes } from './party.routes';
import { partyReducer } from './party.store';
import { PartyEffects } from './party.effects';
import { PartyService } from './party.service';
import { PartyComponent } from './party.component';
import { PartyDetailComponent } from './party-detail.component';
import { PartyFormComponent } from './party-form.component';

@NgModule( {
	declarations: [
		PartyComponent,
		PartyDetailComponent,
		PartyFormComponent
	],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		MatIconModule,
		MatButtonModule,
		MatInputModule,
		MatRadioModule,
		MatSelectModule,
		MatOptionModule,
		MatTooltipModule,
		MatDialogModule,
		MatListModule,
		StoreModule.forFeature( 'partyState', partyReducer ),
		EffectsModule.forFeature( [ PartyEffects ] ),
		JamBounceSpinnerModule,
		JamFacebookSpinnerModule,
		RouterModule.forChild( partyRoutes ),
		FormDialogModule,
		ExplorerModule
	],
	entryComponents: [ PartyFormComponent ],
	providers: [ PartyService ]
} )
export class PartyModule { }
