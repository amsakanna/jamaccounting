import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JamAccordionComponent } from './jam-accordion.component';

@NgModule( {
	imports: [ CommonModule ],
	declarations: [ JamAccordionComponent ],
	exports: [ JamAccordionComponent ]
} )
export class JamAccordionModule { }