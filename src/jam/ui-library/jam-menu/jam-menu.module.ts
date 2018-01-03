import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material';
import { JamMenuComponent } from './jam-menu.component';

@NgModule( {
	imports: [ CommonModule, MatButtonModule ],
	declarations: [ JamMenuComponent ],
	exports: [ JamMenuComponent ],
} )
export class JamMenuModule { }