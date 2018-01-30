/*  Framework Modules  */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule, MatButtonModule, MatListModule } from '@angular/material';
/*  My Library Modules  */
import { JamFacebookSpinnerModule } from '../../../jam/ui-library';
/*  App Components  */
import { ExplorerComponent } from './explorer.component';

@NgModule( {
	declarations: [ ExplorerComponent ],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		MatIconModule,
		MatButtonModule,
		MatListModule,
		JamFacebookSpinnerModule
	],
	exports: [ ExplorerComponent ]
} )
export class ExplorerModule { }
