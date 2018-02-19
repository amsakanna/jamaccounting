/*  Framework Modules  */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
/*  My Library Modules  */
import { JamExplorerSideNavModule } from '../../jam/ui-library';
/*  App Components  */
import { masterRoutes } from './master.routes';
import { MasterComponent } from './master.component';

@NgModule( {
	declarations: [
		MasterComponent
	],
	imports: [
		CommonModule,
		RouterModule.forChild( masterRoutes ),
		JamExplorerSideNavModule
	]
} )
export class MasterModule { }
