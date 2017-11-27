import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material';
import { JamXboxMenuComponent } from './jam-xbox-menu.component';

@NgModule( {
	imports: [ CommonModule, MatButtonModule ],
	declarations: [ JamXboxMenuComponent ],
	exports: [ JamXboxMenuComponent ],
} )
export class JamXboxMenuModule { }