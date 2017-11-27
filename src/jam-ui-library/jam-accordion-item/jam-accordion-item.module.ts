import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material';
import { JamAccordionItemComponent } from './jam-accordion-item.component';

@NgModule( {
	imports: [ CommonModule, MatIconModule ],
	declarations: [ JamAccordionItemComponent ],
	exports: [ JamAccordionItemComponent ],
} )
export class JamAccordionItemModule { }