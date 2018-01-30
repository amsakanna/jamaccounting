/*  Framework Modules  */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatIconModule, MatButtonModule, MatInputModule, MatSelectModule, MatOptionModule, MatTooltipModule } from '@angular/material';
/*  My Library Modules  */
import { JamFacebookSpinnerModule } from '../../../jam/ui-library';
/*  App Components  */
import { FormDialogComponent } from './form-dialog.component';

@NgModule( {
	declarations: [ FormDialogComponent ],
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
		JamFacebookSpinnerModule
	],
	exports: [ FormDialogComponent ]
} )
export class FormDialogModule { }
