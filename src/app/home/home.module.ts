/*  Framework Modules  */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
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

/*  My Library Modules  */
import { JamBounceSpinnerModule } from './../../jam/ui-library';

/*  App Modules  */
import { HomeComponent } from './home.component';
import { AboutComponent } from './about.component';
import { ContactComponent } from './contact.component';
import { PricingComponent } from './pricing.component';

@NgModule( {
	declarations: [
		HomeComponent,
		AboutComponent,
		ContactComponent,
		PricingComponent
	],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		MatIconModule,
		MatButtonModule,
		MatInputModule,
		MatSelectModule,
		JamBounceSpinnerModule
	]
} )
export class HomeModule { }