import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JamAccordionItemModule } from '../jam-accordion-item/jam-accordion-item.module';
import { JamModelLibraryModule } from '../../jam-model-library/jam-model-library.module';
import { JamTreeComponent } from './jam-tree.component';

@NgModule( {
	imports: [ CommonModule, JamAccordionItemModule, JamModelLibraryModule ],
	declarations: [ JamTreeComponent ],
	exports: [ JamTreeComponent ],
} )
export class JamTreeModule { }