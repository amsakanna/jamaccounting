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
	MatTableModule
} from '@angular/material';
/*  3rd Invoice Modules  */
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
/*  My Library Modules  */
import { JamBounceSpinnerModule, JamFacebookSpinnerModule } from './../../jam/ui-library';
/*  App Modules  */
import { FormDialogModule, ExplorerModule } from '../ui';
/*  App Components  */
import { invoiceRoutes } from './invoice.routes';
import { invoiceReducer } from './invoice.store';
import { InvoiceEffects } from './invoice.effects';
import { InvoiceService } from './invoice.service';
import { InvoiceComponent } from './invoice.component';
import { InvoiceDetailComponent } from './invoice-detail.component';
import { InvoiceFormComponent } from './invoice-form.component';

@NgModule( {
	declarations: [
		InvoiceComponent,
		InvoiceDetailComponent,
		InvoiceFormComponent
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
		MatTableModule,
		StoreModule.forFeature( 'invoiceState', invoiceReducer ),
		EffectsModule.forFeature( [ InvoiceEffects ] ),
		JamBounceSpinnerModule,
		JamFacebookSpinnerModule,
		RouterModule.forChild( invoiceRoutes ),
		FormDialogModule,
		ExplorerModule
	],
	entryComponents: [ InvoiceFormComponent ],
	providers: [ InvoiceService ]
} )
export class InvoiceModule { }
