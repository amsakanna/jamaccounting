import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedService } from './shared.service';

@NgModule( {
	imports: [ CommonModule ],
	providers: [ SharedService ]
} )
export class JamFirestoreModule
{
	static forRoot (): ModuleWithProviders
	{
		return {
			ngModule: JamFirestoreModule,
			providers: [ SharedService ]
		};
	}
}