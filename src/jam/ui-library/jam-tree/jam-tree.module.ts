import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JamAccordionItemModule } from '../jam-accordion-item/jam-accordion-item.module';
import { JamTreeComponent } from './jam-tree.component';

@NgModule( {
	imports: [ CommonModule, JamAccordionItemModule ],
	declarations: [ JamTreeComponent ],
	exports: [ JamTreeComponent ],
} )
export class JamTreeModule { }