import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { JamModelLibraryModule } from './../../jam-model-library/jam-model-library.module';
import { JamListModule } from '../jam-list/jam-list.module';
import { JamTreeListComponent } from './jam-tree-list.component';

@NgModule( {
	imports: [
		CommonModule,
		MatButtonModule,
		MatIconModule,
		JamListModule,
		JamModelLibraryModule
	],
	declarations: [ JamTreeListComponent ],
	exports: [ JamTreeListComponent ],
} )
export class JamTreeListModule { }