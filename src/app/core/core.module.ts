import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { coreReducers } from './core.reducers';
import { CoreEffects } from './core.effects';

@NgModule( {
	declarations: [],
	imports: [
		CommonModule,
		StoreModule.forFeature( 'coreState', coreReducers ),
		EffectsModule.forFeature( [ CoreEffects ] )
	],
	exports: [],
	providers: []
} )
export class CoreModule { }