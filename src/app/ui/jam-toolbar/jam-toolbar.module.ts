/*  Framework Modules  */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule, MatButtonModule, MatTooltipModule } from '@angular/material';
/*  App Components  */
import { JamToolbarComponent } from './toolbar.component';

@NgModule( {
	declarations: [ JamToolbarComponent ],
	imports: [
		CommonModule,
		MatIconModule,
		MatButtonModule,
		MatTooltipModule
	],
	exports: [ JamToolbarComponent ]
} )
export class JamToolbarModule { }
