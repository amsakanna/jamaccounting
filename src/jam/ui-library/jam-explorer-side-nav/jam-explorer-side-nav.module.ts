import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatIconModule, MatListModule } from '@angular/material';
import { JamExplorerSideNavComponent } from './jam-explorer-side-nav.component';

@NgModule( {
	imports: [ CommonModule, MatButtonModule, MatIconModule, MatListModule ],
	declarations: [ JamExplorerSideNavComponent ],
	exports: [ JamExplorerSideNavComponent ]
} )
export class JamExplorerSideNavModule { }
