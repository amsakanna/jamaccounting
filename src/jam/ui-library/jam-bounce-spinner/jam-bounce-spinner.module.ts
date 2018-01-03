import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JamBounceSpinnerComponent } from './jam-bounce-spinner.component';

@NgModule( {
	imports: [ CommonModule ],
	declarations: [ JamBounceSpinnerComponent ],
	exports: [ JamBounceSpinnerComponent ]
} )
export class JamBounceSpinnerModule { }