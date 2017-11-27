import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JamListComponent } from './jam-list.component';

@NgModule( {
	imports: [ CommonModule ],
	declarations: [ JamListComponent ],
	exports: [ JamListComponent ],
} )
export class JamListModule { }