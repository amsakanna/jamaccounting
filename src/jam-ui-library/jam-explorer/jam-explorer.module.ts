import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { JamExplorerComponent } from './jam-explorer.component';

@NgModule( {
	imports: [ CommonModule, MatButtonModule, MatIconModule ],
	declarations: [ JamExplorerComponent ],
	exports: [ JamExplorerComponent ]
} )
export class JamExplorerModule { }