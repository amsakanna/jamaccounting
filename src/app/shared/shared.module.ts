import { NgModule, ModuleWithProviders } from '@angular/core';
import { DatabaseService } from './database.service';

@NgModule( {
	providers: [ DatabaseService ]
} )
export class SharedModule
{
	static forRoot (): ModuleWithProviders
	{
		return {
			ngModule: SharedModule,
			providers: [ DatabaseService ]
		};
	}
}